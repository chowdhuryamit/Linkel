import React, { useState } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react"; // Importing icons from lucide-react
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { toast } from "react-toastify";

const BookmarkPage = ({
  userData,
  savedPost,
  hasMoreSavedPost,
  fetchSavedPosts,
}) => {
  
  const handleRemoveBookmark = async (id) => {
    try {
      const Id = id.toString();
      
      const res = await axios.delete( `${import.meta.env.VITE_BASE_URL}/api/u3/remove/user/savedPost?id=${Id}`,{withCredentials:true});
      if(res.data.success){
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 p-4 sm:p-6 md:p-8 flex flex-col items-center">
      {/* Header Section */}
      <header className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-700 mb-4 sm:mb-0 text-center">
          Your Bookmarked Posts
        </h1>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-4xl">
        {savedPost.length === 0 ? (
          <div className="bg-white shadow-lg rounded-xl p-8 text-center text-gray-500 text-lg">
            <p>You haven't bookmarked any posts yet.</p>
            <p className="mt-2">
              Start exploring to save your favorite content!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6 feed-scroll-wrapper">
            {" "}
            {/* Changed to flex-col for single rows */}
            <InfiniteScroll
              dataLength={savedPost.length}
              next={fetchSavedPosts}
              hasMore={hasMoreSavedPost}
              loader={<p className="text-center text-gray-400">Loading...</p>}
              endMessage={
                <p className="text-center text-gray-400">No more posts</p>
              }
              scrollableTarget="scrollableDiv"
            >
              {savedPost.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col sm:flex-row transition-transform duration-200 hover:scale-[1.05] transform  mb-4"
                >
                  {/* Post Image */}
                  <div className="sm:w-1/3 flex-shrink-0">
                    {" "}
                    {/* Image takes 1/3 width on small screens and up */}
                    {post.fileType === "picture" && (
                      <img
                        src={post.picture}
                        alt={post.text}
                        className="w-full h-48 sm:h-full object-cover object-center rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none"
                      />
                    )}
                    {post.fileType === "video" && (
                      <video
                        src={post.video}
                        controls
                        playsInline
                        preload="metadata"
                        className="w-full h-full rounded-lg mb-4 object-cover"
                      />
                    )}
                  </div>

                  {/* Post Content */}
                  <div className="p-5 flex flex-col sm:w-2/3 flex-grow">
                    {" "}
                    {/* Content takes 2/3 width on small screens and up */}
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {post.text}
                    </h2>
                    <div className="flex justify-between items-center text-xs text-gray-500 mt-auto pt-2">
                      <span>By: {post.owner.name}</span>
                      <span>
                        {new Date(post.createdAt).toLocaleString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    </div>
                    {/* Engagement Metrics */}
                    <div className="flex items-center space-x-6 text-gray-700 mt-4">
                      <div className="flex items-center">
                        <Heart size={18} className="text-red-500 mr-1" />
                        <span className="text-sm">{post.likes}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle
                          size={18}
                          className="text-blue-500 mr-1"
                        />
                        <span className="text-sm">{post.comments}</span>
                      </div>
                      <div className="flex items-center">
                        <Share2 size={18} className="text-green-500 mr-1" />
                        <span className="text-sm">{post.shares}</span>
                      </div>
                    </div>
                    {/* Remove Bookmark Button */}
                    <button
                      onClick={() => handleRemoveBookmark(post._id)}
                      className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 shadow-sm hover:shadow-md"
                    >
                      Remove Bookmark
                    </button>
                  </div>
                </div>
              ))}
            </InfiniteScroll>
          </div>
        )}
      </main>
    </div>
  );
};

export default BookmarkPage;
