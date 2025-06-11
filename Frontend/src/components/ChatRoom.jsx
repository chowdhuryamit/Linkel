import React from 'react'
import { useState,useEffect } from 'react';

const ChatRoom = ({friendName,onBack}) => {
    const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Dummy messages for demonstration, filtered by friendName
  useEffect(() => {
    // In a real app, you'd fetch messages specific to 'friendName'
    setMessages([
      { id: 1, sender: friendName, text: 'Hey there! How are you doing?', time: '10:00 AM' },
      { id: 2, sender: 'You', text: 'I\'m doing great, thanks for asking! What about you?', time: '10:01 AM' },
      { id: 3, sender: friendName, text: 'I\'m good too! Just saw your latest post, really liked it.', time: '10:05 AM' },
      { id: 4, sender: 'You', text: 'Awesome! Glad you liked it. What are you up to today?', time: '10:10 AM' },
      { id: 5, sender: friendName, text: 'Just chilling, thinking about what to cook for dinner. Any ideas?', time: '10:12 AM' },
    ]);
  }, [friendName]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: 'You',
        text: newMessage.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const MessageBubble = ({ message, isSender }) => (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs px-4 py-2 rounded-xl shadow-md
        ${isSender ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}
      >
        <p className="text-sm">{message.text}</p>
        <p className={`text-xs mt-1 ${isSender ? 'text-blue-200' : 'text-gray-500'} text-right`}>{message.time}</p>
      </div>
    </div>
  );
  return (
    <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col h-[80vh]">
      <div className="flex items-center mb-6 pb-4 border-b">
        <button
          onClick={onBack}
          className="text-gray-500 hover:text-gray-700 mr-4 focus:outline-none"
          aria-label="Back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-gray-900 flex-1">Chat with {friendName}</h2>
        <img
          src={`https://placehold.co/40x40/FF5733/FFFFFF?text=${friendName.charAt(0)}`}
          alt={friendName}
          className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/E2E8F0/1A202C?text=?" }}
        />
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {messages.map(message => (
          <MessageBubble key={message.id} message={message} isSender={message.sender === 'You'} />
        ))}
      </div>

      <div className="mt-6 pt-4 border-t flex items-center space-x-3">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors shadow-md"
          aria-label="Send message"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ChatRoom
