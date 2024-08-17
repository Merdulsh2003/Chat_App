import React, { useContext, useEffect, useState } from 'react'
import './Chat.css'
import LeftSlidebar from '../../components/LeftSlidebar/LeftSlidebar'
import Chatbox from '../../components/Chatbox/Chatbox'
import RightSlidebar from '../../components/RightSlidebar/RightSlidebar'
import { AppContext } from '../../context/AppContext'
const Chat = () => {

  const { chatData, userData } = useContext(AppContext);
  const [loading, setLoading ] = useState(true);

  useEffect(()=>{
    if (chatData && userData) {
      setLoading(false)
      
    }

  },[chatData,userData])

  return (
    <div className='chat'>
      {
        loading
          ? <p className="loading">Loading...</p>
          : <div className="chat-container">
            <LeftSlidebar />
            <Chatbox />
            <RightSlidebar />
          </div>
      }


    </div>
  )
}

export default Chat
