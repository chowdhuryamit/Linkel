import React, { useState } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react'; // Importing icons from lucide-react

const BookmarkPage = () => {
    const [bookmarkedPosts, setBookmarkedPosts] = useState([
        {
          id: '1',
          title: 'The Future of AI in Healthcare',
          description: 'Explore how artificial intelligence is revolutionizing diagnostics, treatment, and patient care.',
          author: 'Tech Insights',
          date: '2023-10-26',
          imageUrl: 'https://placehold.co/400x250/AEC6CF/000000?text=AI+in+Healthcare',
          likes: 125,
          comments: 32,
          shares: 18,
        },
        {
          id: '2',
          title: 'Mastering React Hooks: A Comprehensive Guide',
          description: 'Dive deep into useState, useEffect, useContext, and custom hooks to build robust React applications.',
          author: 'DevZone',
          date: '2024-01-15',
          imageUrl: 'https://placehold.co/400x250/B3E0FF/000000?text=React+Hooks',
          likes: 240,
          comments: 65,
          shares: 40,
        },
        {
          id: '3',
          title: 'Sustainable Living: Tips for a Greener Home',
          description: 'Practical advice on reducing your carbon footprint and creating an eco-friendly living space.',
          author: 'Eco Warriors',
          date: '2023-09-01',
          imageUrl: 'https://placehold.co/400x250/C8F0C8/000000?text=Sustainable+Living',
          likes: 88,
          comments: 15,
          shares: 9,
        },
        {
          id: '4',
          title: 'Exploring the Wonders of Deep Space',
          description: 'A fascinating journey through galaxies, nebulae, and the mysteries of the universe.',
          author: 'Cosmic Discoveries',
          date: '2024-03-20',
          imageUrl: 'https://placehold.co/400x250/D1D0F0/000000?text=Deep+Space',
          likes: 190,
          comments: 48,
          shares: 25,
        },
        {
          id: '5',
          title: 'The Art of Storytelling: Crafting Compelling Narratives',
          description: 'Learn the essential elements of effective storytelling for writers and communicators.',
          author: 'Creative Minds',
          date: '2023-11-10',
          imageUrl: 'https://placehold.co/400x250/E5CCFF/000000?text=Storytelling',
          likes: 160,
          comments: 55,
          shares: 30,
        },
      ]);
    
      // Function to remove a bookmarked post
      const handleRemoveBookmark = (id) => {
        setBookmarkedPosts(bookmarkedPosts.filter(post => post.id !== id));
      };
  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800 p-4 sm:p-6 md:p-8 flex flex-col items-center">
      {/* Header Section */}
      <header className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6 mb-8 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-700 mb-4 sm:mb-0">Your Bookmarked Posts</h1>
        <p className="text-gray-600 text-center sm:text-left">Manage your saved articles and content.</p>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-4xl">
        {bookmarkedPosts.length === 0 ? (
          <div className="bg-white shadow-lg rounded-xl p-8 text-center text-gray-500 text-lg">
            <p>You haven't bookmarked any posts yet.</p>
            <p className="mt-2">Start exploring to save your favorite content!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6"> {/* Changed to flex-col for single rows */}
            {bookmarkedPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col sm:flex-row transition-transform duration-200 hover:scale-[1.02] transform"
              >
                {/* Post Image */}
                <div className="sm:w-1/3 flex-shrink-0"> {/* Image takes 1/3 width on small screens and up */}
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 sm:h-full object-cover object-center rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none"
                    // Fallback for image loading errors
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x250/E5E7EB/000000?text=Image+Not+Found"; }}
                  />
                </div>

                {/* Post Content */}
                <div className="p-5 flex flex-col sm:w-2/3 flex-grow"> {/* Content takes 2/3 width on small screens and up */}
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
                  <p className="text-gray-600 text-sm mb-3 flex-grow">{post.description}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500 mt-auto pt-2">
                    <span>By: {post.author}</span>
                    <span>{post.date}</span>
                  </div>

                  {/* Engagement Metrics */}
                  <div className="flex items-center space-x-6 text-gray-700 mt-4">
                    <div className="flex items-center">
                      <Heart size={18} className="text-red-500 mr-1" />
                      <span className="text-sm">{post.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle size={18} className="text-blue-500 mr-1" />
                      <span className="text-sm">{post.comments}</span>
                    </div>
                    <div className="flex items-center">
                      <Share2 size={18} className="text-green-500 mr-1" />
                      <span className="text-sm">{post.shares}</span>
                    </div>
                  </div>

                  {/* Remove Bookmark Button */}
                  <button
                    onClick={() => handleRemoveBookmark(post.id)}
                    className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 shadow-sm hover:shadow-md"
                  >
                    Remove Bookmark
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default BookmarkPage
