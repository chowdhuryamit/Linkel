import React from 'react'
import { useState,useEffect } from 'react'

const Notification = () => {
    // State to hold notification data
  const [notifications, setNotifications] = useState([]);
  // State to hold the current active filter (e.g., "All", "Unread", "Mentions")
  const [activeFilter, setActiveFilter] = useState('All');

  // Dummy data for notifications
  // In a real application, this would come from an API or a database
  const dummyNotifications = [
    {
      id: '1',
      type: 'like',
      user: 'Alice Smith',
      content: 'liked your recent post about #reactjs.',
      time: 'Just now',
      read: false,
      avatar: 'https://placehold.co/40x40/FF5733/FFFFFF?text=AS'
    },
    {
      id: '2',
      type: 'comment',
      user: 'Bob Johnson',
      content: 'commented on your photo: "Amazing view!"',
      time: '5 minutes ago',
      read: false,
      avatar: 'https://placehold.co/40x40/33FF57/FFFFFF?text=BJ'
    },
    {
      id: '3',
      type: 'mention',
      user: 'Charlie Brown',
      content: 'mentioned you in their post about #webdevelopment.',
      time: '15 minutes ago',
      read: false,
      avatar: 'https://placehold.co/40x40/3357FF/FFFFFF?text=CB'
    },
    {
      id: '4',
      type: 'follow',
      user: 'Diana Prince',
      content: 'started following you.',
      time: '30 minutes ago',
      read: false,
      avatar: 'https://placehold.co/40x40/FF33E9/FFFFFF?text=DP'
    },
    {
      id: '5',
      type: 'share',
      user: 'Eve Adams',
      content: 'shared your post to their story.',
      time: '45 minutes ago',
      read: true,
      avatar: 'https://placehold.co/40x40/FFD433/000000?text=EA'
    },
    {
      id: '6',
      type: 'friend_request',
      user: 'Frank Miller',
      content: 'sent you a friend request.',
      time: '1 hour ago',
      read: false,
      actions: ['Accept', 'Decline'],
      avatar: 'https://placehold.co/40x40/33FFF0/000000?text=FM'
    },
    {
      id: '7',
      type: 'group_invite',
      user: 'Grace Hopper',
      content: 'invited you to join the group "React Enthusiasts".',
      time: '3 hours ago',
      read: true,
      actions: ['Accept', 'Decline'],
      avatar: 'https://placehold.co/40x40/8D33FF/FFFFFF?text=GH'
    },
    {
      id: '8',
      type: 'update',
      user: 'Harry Potter',
      content: 'posted a new update: "Excited for my next adventure!"',
      time: '1 hour ago',
      read: true,
      avatar: 'https://placehold.co/40x40/33FF8D/000000?text=HP'
    },
    {
      id: '9',
      type: 'mention',
      user: 'Ivy Green',
      content: 'mentioned you in a comment on Alice Smith\'s post.',
      time: '4 hours ago',
      read: true,
      avatar: 'https://placehold.co/40x40/F033FF/FFFFFF?text=IG'
    },
    {
      id: '10',
      type: 'birthday',
      user: 'Jack Black',
      content: 'It\'s Jack Black\'s birthday! Wish them well.',
      time: '8 hours ago',
      read: true,
      avatar: 'https://placehold.co/40x40/A6FF33/000000?text=JB'
    },
  ];

  // Load dummy notifications on component mount
  useEffect(() => {
    setNotifications(dummyNotifications);
  }, []);

  // Function to filter notifications based on the active filter
  const getFilteredNotifications = () => {
    switch (activeFilter) {
      case 'Unread':
        return notifications.filter(notification => !notification.read);
      case 'Mentions':
        return notifications.filter(notification => notification.type === 'mention');
      case 'All':
      default:
        return notifications;
    }
  };

  // Function to mark a specific notification as read
  const markAsRead = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Function to mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };

  // Notification item component
  const NotificationItem = ({ notification }) => (
    <div
      className={`flex items-start p-4 mb-3 rounded-xl shadow-sm cursor-pointer transition-all duration-200 ease-in-out
        ${notification.read ? 'bg-white hover:bg-gray-50' : 'bg-blue-50 hover:bg-blue-100'}`}
      onClick={() => markAsRead(notification.id)}
    >
      {/* User Avatar */}
      <img
        src={notification.avatar || `https://placehold.co/40x40/E2E8F0/1A202C?text=${notification.user.charAt(0)}`}
        alt={notification.user}
        className="w-10 h-10 rounded-full mr-4 object-cover border-2 border-gray-200"
        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/E2E8F0/1A202C?text=?" }} // Fallback for broken images
      />
      {/* Notification Content */}
      <div className="flex-1">
        <p className={`text-sm ${notification.read ? 'text-gray-700' : 'text-gray-900 font-medium'}`}>
          <span className="font-semibold">{notification.user}</span> {notification.content}
        </p>
        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
        {/* Actions for specific notification types */}
        {notification.actions && (
          <div className="mt-2 flex space-x-2">
            {notification.actions.map((action, index) => (
              <button
                key={index}
                className="px-3 py-1 text-xs rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent marking as read when clicking action button
                  console.log(`${action} ${notification.user}'s request`);
                  // Add logic here to handle accept/decline, etc.
                  markAsRead(notification.id); // Mark as read after action
                }}
              >
                {action}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Unread indicator */}
      {!notification.read && (
        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-4 mt-2"></div>
      )}
    </div>
  );
  return (
    <div className="min-h-screen bg-gray-100 font-['Inter'] p-4 sm:p-6 lg:p-8 flex justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h1 className="text-3xl font-extrabold text-gray-900">Notifications</h1>
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors text-sm font-medium"
          >
            Mark all as read
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          {['All', 'Unread', 'Mentions', 'Friend Requests', 'Updates'].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                ${activeFilter === filter
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="space-y-4">
          {getFilteredNotifications().length > 0 ? (
            getFilteredNotifications().map(notification => (
              <NotificationItem key={notification.id} notification={notification} />
            ))
          ) : (
            <div className="text-center text-gray-500 py-10">
              <p className="text-lg">No notifications found for this filter.</p>
              <p className="text-sm mt-2">Check back later or adjust your filters!</p>
            </div>
          )}
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center text-blue-600">
          <a href="#" className="hover:underline mx-2">View Older Notifications</a>
          <span className="mx-2 text-gray-400">|</span>
          <a href="#" className="hover:underline mx-2">Notification Settings</a>
        </div>
      </div>
    </div>
  )
}

export default Notification
