import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import axios from "axios";
import {MoreHorizontal,Heart,MessageCircle,Share2} from 'lucide-react'

const FeedPosts = ({userData}) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/u2/get/public/posts?page=${page}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setPosts((prev) => [...prev, ...res.data.posts]);
        setHasMore(res.data.hasMore);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMore}
        loader={<p className="text-center text-gray-400">Loading...</p>}
        endMessage={<p className="text-center text-gray-400">No more posts</p>}
      >
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-sm p-4 mb-3"
            style={{
              backgroundImage:
                "linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)",
            }}
          >
            {/* Post Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={post.owner.picture}
                  alt={`${post.userName} Avatar`}
                  className="w-10 h-10 rounded-full border-2 border-gray-200"
                />
                <div>
                  <p className="font-semibold text-base">{post.owner.name}</p>
                  <p className="text-gray-500 text-sm">{post.createdAt}</p>
                </div>
              </div>
              <MoreHorizontal
                size={20}
                className="text-gray-500 cursor-pointer"
              />
            </div>

            {/* Post Content */}
            <p className="mb-3 text-gray-800">{post.text}</p>
            {post.fileType === "picture" && (
              <img
                src={post.picture}
                alt="Post Image"
                className="w-full h-auto rounded-lg mb-4 object-cover"
              />
            )}
            {post.fileType === "video" && (
                <video src={post.video}
                controls
                playsInline
                preload="metadata"
                className="w-full h-auto rounded-lg mb-4 object-cover"
                />
            )}

            {/* Post Engagement (Likes, Comments, Shares) */}
            <div className="flex items-center justify-between border-t border-b py-3 mb-3">
              <div className="flex justify-between items-center w-full">
                <button className="flex-1 flex items-center justify-center gap-1 text-gray-600 hover:text-red-500">
                  <Heart size={20} />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 text-gray-600 hover:text-blue-500">
                  <MessageCircle size={20} />
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 text-gray-600 hover:text-green-500">
                  <Share2 size={20} />
                  <span className="text-sm">{post.shares}</span>
                </button>
              </div>
            </div>

            {/* Write a comment section */}
            <div className="flex items-center gap-3">
              <img
                src={userData.picture}
                alt="Your Avatar"
                className="w-8 h-8 rounded-full border-2 border-blue-500"
              />
              <input
                type="text"
                placeholder={`Comment as ${userData.name}`}
                className="flex-grow py-2 px-4 bg-gray-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </>
  );
};

export default FeedPosts;
