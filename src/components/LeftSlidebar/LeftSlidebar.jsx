import React, { useContext, useEffect, useState } from 'react';
import './LeftSlidebar.css';
import assets from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { arrayUnion, collection, query, where, getDocs, doc, serverTimestamp, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { db, logout } from '../../config/firebase';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const LeftSlidebar = () => {

    const navigate = useNavigate();
    const { userData, chatData, setChatData, chatUser, setChatUser, setMessagesId, messageId, chatVisible, setChatVisible } = useContext(AppContext);
    const [user, setUser] = useState(null);
    const [showSearch, setShowSearch] = useState(false);

    const inputHandler = async (e) => {
        try {
            const input = e.target.value;
            if (input) {
                setShowSearch(true);
                const userRef = collection(db, 'users');
                const q = query(userRef, where("username", "==", input.toLowerCase()));
                const querySnap = await getDocs(q);
                if (!querySnap.empty && querySnap.docs[0].data().id !== userData.id) {

                    // Check if the user already exists in chatData
                    let userExist = chatData.some(chat => chat.rId === querySnap.docs[0].data().id);

                    // If the user doesn't exist in chatData, set the user state
                    if (!userExist) {
                        setUser(querySnap.docs[0].data());
                    } else {
                        setUser(null);
                    }
                } else {
                    setUser(null);
                }
            } else {
                setShowSearch(false);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            toast.error("Error fetching user data.");
        }
    };

    const addChat = async () => {
        const messagesRef = collection(db, "messages");
        const chatsRef = collection(db, "chats");
        try {
            const newMessageRef = doc(messagesRef);

            await setDoc(newMessageRef, {
                createAt: serverTimestamp(),
                messages: []
            });

            await updateDoc(doc(chatsRef, user.id), {
                chatsData: arrayUnion({
                    messageId: newMessageRef.id,
                    lastMessage: "",
                    rId: userData.id,
                    updatedAt: Date.now(),
                    messageSeen: true
                })
            });

            await updateDoc(doc(chatsRef, userData.id), {
                chatsData: arrayUnion({
                    messageId: newMessageRef.id,
                    lastMessage: "",
                    rId: user.id,
                    updatedAt: Date.now(),
                    messageSeen: true
                })
            });

            const uSnap = await getDoc(doc(db, "users", user.id));
            const uData = uSnap.data();
            const newChat = {
                messageId: newMessageRef.id,
                rId: user.id,
                updatedAt: Date.now(),
                messageSeen: true,
                userData: uData
            };

            // Filter out any existing chat with the same user ID before adding the new chat
            setChatData(prev => [...prev.filter(chat => chat.rId !== user.id), newChat]);

            setShowSearch(false);
            setChatVisible(true);

        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    };

    const setChat = async (item) => {
        try {
            setMessagesId(item.messageId);
            setChatUser(item);

            const userChatsRef = doc(db, 'chats', userData.id);
            const userChatsSnapshot = await getDoc(userChatsRef);
            const userChatsData = userChatsSnapshot.data();

            const chatIndex = userChatsData.chatsData.findIndex(chat => chat.messageId === item.messageId);

            if (chatIndex !== -1) {
                userChatsData.chatsData[chatIndex].messageSeen = true;

                await updateDoc(userChatsRef, {
                    chatsData: userChatsData.chatsData
                });
            }

            setChatVisible(true);
        } catch (error) {
            toast.error(error.message);
            console.error("Error setting chat:", error);
        }
    };

    useEffect(() => {
        const updateChatUserData = async () => {
            if (chatUser) {
                const userRef = doc(db, "users", chatUser.userData.id);
                const userSnap = await getDoc(userRef);
                const userData = userSnap.data();
                setChatUser(prev => ({ ...prev, userData }));
            }
        };
        updateChatUserData();
    }, [chatData]);

    return (
        <div className={`ls ${chatVisible ? "hidden" : ""}`}>
            <div className="ls-top">
                <div className="ls-nav">
                    <img src={assets.logo} className="logo" alt="" />
                    <div className="menu">
                        <img src={assets.menu_icon} alt="" />
                        <div className="sub-menu">
                            <p onClick={() => navigate('/profile')}>Edit Profile</p>
                            <hr />
                            <p onClick={()=> logout()}>Logout</p>
                        </div>
                    </div>
                </div>
                <div className="ls-search">
                    <img src={assets.search_icon} alt="" />
                    <input onChange={inputHandler} type="text" placeholder='Search here..' />
                </div>
            </div>
            <div className="ls-list">
                {showSearch && user
                    ? <div onClick={addChat} className='friends add-user'>
                        <img src={user.avatar} alt="" />
                        <p>{user.name}</p>
                    </div>
                    : chatData.map((item, index) => (
                        <div onClick={() => setChat(item)} key={index} className={`friends ${item.messageSeen || item.messageId === messageId ? "" : "border"}`}>
                            <img src={item.userData.avatar} alt="" />
                            <div>
                                <p>{item.userData.name}</p>
                                <span>{item.lastMessage}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default LeftSlidebar;
