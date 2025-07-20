import React from 'react'
import { useState } from 'react';
import {FriendList,ChatRoom} from './index.js'

const Messages = () => {
    const [currentView, setCurrentView] = useState('friendsList'); // Changed default view to 'friendsList'
  // State to hold the name of the friend being chatted with
  const [chatFriendName, setChatFriendName] = useState('');

  // Function to navigate to the Friends List
  const navigateToFriends = () => {
    setCurrentView('friendsList');
  };

  // Function to navigate to the Chat page for a specific friend
  const navigateToChat = (name) => {
    setChatFriendName(name);
    setCurrentView('chat');
  };

  // Function to go back to the previous view
  const goBack = () => {
    setCurrentView('friendsList');
  };

  return (
    <div className="min-h-screen bg-gray-100 font-['Inter'] p-4 sm:p-6 lg:p-8 flex justify-center items-start">
      {currentView === 'friendsList' && (
        <FriendList onNavigateToChat={navigateToChat}/>
      )}

      {currentView === 'chat' && (
        <ChatRoom friendName={chatFriendName} onBack={goBack} />
      )}
    </div>
  )
}

export default Messages
