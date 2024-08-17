import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/web-extension";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKzqRXq73BBNzdBpsPVwQhUSTOqT1fwwQ",
  authDomain: "link-up-ms.firebaseapp.com",
  projectId: "link-up-ms",
  storageBucket: "link-up-ms.appspot.com",
  messagingSenderId: "491136735427",
  appId: "1:491136735427:web:e1b1e5e944897031f26a76"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(username,email,password) => {
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await setDoc(doc(db,"users",user.uid),{
            id:user.uid,
            username:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"Hey,There i am using chat app",
            lastSeen:Date.now()

        })
        await setDoc(doc(db,"chats",user.uid),{
            chatsData:[]
        })
    } catch (error){
        console.error(error)
        toast.error(error.code.split('/')[1].split('-'),join(" "));

    }
}

const login = async(email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = async () => {
    try {
        await signOut(auth)
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }
}

const resetPass = async (email) => {
    if (!email) {
        toast.error("Enter your email");
        return null;
    }
    try {
        const userRef = collection(db,'users');
        const q = query(userRef,where("email","==",email));
        const querySnap = await getDocs(q);
        if (!querySnap.empty) {
            await sendPasswordResetEmail(auth,email);
            toast.success("Reset Email Sent")
        }
        else{
            toast.error("Email doesn't exists")
        }
    } catch (error) {
        console.error(error);
        toast.error(error.message)
    }
}
export {signup, login, logout,auth,db, resetPass}