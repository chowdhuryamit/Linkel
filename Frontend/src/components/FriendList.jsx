import React from 'react'
import { useState,useEffect } from 'react';


const FriendList = ({onNavigateToChat}) => {
    const [friends, setFriends] = useState([]);

  // Dummy friends data
  const dummyFriends = [
    { id: 'f1', name: 'Alice Smith', avatar: 'https://placehold.co/40x40/FF5733/FFFFFF?text=AS', lastMessage: 'See you tomorrow!', lastMessageTime: '10:30 AM' },
    { id: 'f2', name: 'Bob Johnson', avatar: 'https://placehold.co/40x40/33FF57/FFFFFF?text=BJ', lastMessage: 'Got it, thanks!', lastMessageTime: 'Yesterday' },
    { id: 'f3', name: 'Charlie Brown', avatar: 'https://placehold.co/40x40/3357FF/FFFFFF?text=CB', lastMessage: 'Happy to help!', lastMessageTime: 'Tuesday' },
    { id: 'f4', name: 'Diana Prince', avatar: 'https://placehold.co/40x40/FF33E9/FFFFFF?text=DP', lastMessage: 'Sounds good!', lastMessageTime: 'Monday' },
    { id: 'f5', name: 'Eve Adams', avatar: 'https://placehold.co/40x40/FFD433/000000?text=EA', lastMessage: 'Lets catch up soon.', lastMessageTime: 'Last Week' },
    { id: 'f6', name: 'Frank Miller', avatar: 'https://placehold.co/40x40/33FFF0/000000?text=FM', lastMessage: 'Okay!', lastMessageTime: 'Last Month' },
  ];

  useEffect(() => {
    setFriends(dummyFriends);
  }, []);
  return (
    <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 sm:p-8">
    <div className="flex justify-between items-center mb-6 pb-4 border-b">
      <h1 className="text-2xl font-bold text-gray-900 flex-1">Chats</h1>
      <button
        onClick={() => console.log('Search button clicked!')} // Placeholder for search functionality
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors text-sm font-medium"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Search
      </button>
    </div>

    <div className="space-y-3">
      {friends.length > 0 ? (
        friends.map(friend => (
          <div
            key={friend.id}
            className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors"
            onClick={() => onNavigateToChat(friend.name)}
          >
            <img
              src={friend.avatar || `https://placehold.co/40x40/E2E8F0/1A202C?text=${friend.name.charAt(0)}`}
              alt={friend.name}
              className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-gray-200"
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/E2E8F0/1A202C?text=?" }}
            />
            <div className="flex-1">
              <p className="text-lg font-medium text-gray-800">{friend.name}</p>
              <p className="text-sm text-gray-500 truncate">{friend.lastMessage}</p>
            </div>
            <p className="text-xs text-gray-400 ml-2">{friend.lastMessageTime}</p>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 py-10">
          <p className="text-lg">No friends found.</p>
          <p className="text-sm mt-2">Time to start a new chat!</p>
        </div>
      )}
    </div>
  </div>
  )
}

export default FriendList
