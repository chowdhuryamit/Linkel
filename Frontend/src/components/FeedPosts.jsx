import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import axios from "axios";
import { MoreHorizontal, Heart, MessageCircle, Share2 } from "lucide-react";
import { savePostFunction } from "../service/savePost.js";
import { handleDeletePost } from "../service/deletePost.js";
import { EditPost } from "../components/index.js";

const FeedPosts = ({ userData, posts, hasMore, fetchPosts }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [activeDropDownPostId, setActiveDropDownPostId] = useState(null);
  const [following, setFollowing] = useState(null);
  const [ownerId, setOwnerId] = useState(null);

  useEffect(() => {
    if (showDropDown && activeDropDownPostId && ownerId) {
      (async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/u2/get/follow/status?userId=${ownerId}`,
            { withCredentials: true }
          );
          if (res.data.success) {
            if (res.data.following) {
              setFollowing(true);
            } else {
              setFollowing(false);
            }
          }
        } catch (error) {
          setFollowing(null);
          toast.error(error.response.data.message);
        }
      })();
    }
  }, [activeDropDownPostId, ownerId]);

  const followFunction = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/u3/follow/user`,
        { userId: ownerId },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setShowDropDown(false);
      } else {
        toast.warn(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const unfollowFunction = async () => {
    console.log("inside unfollow function");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/u3/unfollow/user`,
        { userId: ownerId },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setShowDropDown(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  //post edit hooks
  const [editingPostId, setEditingPostId] = useState(null);

  const handleEditClick = (post) => {
    setEditingPostId(post._id);
    setShowDropDown(false);
  };
  const handleEditClose = () => {
    setEditingPostId(null);
  };

  return (
    <>
      {editingPostId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm z-40"></div>
      )}
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMore}
        loader={<p className="text-center text-gray-400">Loading...</p>}
        endMessage={<p className="text-center text-gray-400">No more posts</p>}
        scrollableTarget="scrollableDiv"
      >
        {posts.map((post) => (
          <div
            key={post._id}
            className="relative bg-white rounded-xl shadow-sm p-4 mb-3"
            style={{
              backgroundImage:
                "linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)",
            }}
          >
            {/* Edit Modal above post */}
            {editingPostId === post._id && userData._id===post.owner._id && (
              <div className="absolute inset-0 flex items-center justify-center z-50">
                <EditPost
                  post={post}
                  onClose={handleEditClose}
                />
              </div>
            )}

            {/* Normal Post UI */}
            {/* Post Header */}
            <div className={`${editingPostId === post._id ? "opacity-0" : ""}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={post.owner.picture}
                    alt={`${post.userName} Avatar`}
                    className="w-10 h-10 rounded-full border-2 border-blue-600"
                  />
                  <div>
                    <p className="font-semibold text-base">
                      {post.owner.name}
                      <span className="text-sm text-gray-500 ml-1">
                        @{post.owner.username}
                      </span>
                    </p>
                    <p className="text-gray-500 text-sm">
                      {new Date(post.createdAt).toLocaleString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <MoreHorizontal
                    size={20}
                    className="text-gray-500 cursor-pointer"
                    onClick={() => {
                      setShowDropDown(!showDropDown);
                      setActiveDropDownPostId(post._id);
                      setOwnerId(post.owner._id);
                    }}
                  />

                  {/* Dropdown Menu */}
                  {showDropDown && activeDropDownPostId === post._id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md z-10">
                      {post.owner._id === userData._id && (
                        <>
                          <button
                            onClick={() => {
                              handleEditClick(post)
                            }}
                            className="text-blue-500 font-semibold block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              handleDeletePost({ id: post._id, axios, toast })
                            }
                            className="text-gray-600 font-semibold block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                          >
                            Delete
                          </button>
                        </>
                      )}
                      {post.owner._id !== userData._id && (
                        <>
                          {following && (
                            <button
                              className="text-pink-400 font-semibold block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                              onClick={() => unfollowFunction()}
                            >
                              Unfollow
                            </button>
                          )}
                          {!following && (
                            <button
                              className="text-blue-600 font-semibold block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                              onClick={() => followFunction()}
                            >
                              Follow
                            </button>
                          )}
                          <button
                            className="text-green-600 font-semibold block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                            onClick={() =>
                              savePostFunction(axios, post._id, toast)
                            }
                          >
                            Save
                          </button>
                          <button className="text-red-500 font-semibold block w-full text-left px-4 py-2 text-sm hover:bg-gray-200">
                            Report
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
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
                <video
                  src={post.video}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-auto rounded-lg mb-4 object-cover"
                />
              )}

              {/* Post Engagement (Likes, Comments, Shares) */}
              <div className="flex items-center justify-between border-t border-b py-3 mb-3">
                <div className="flex justify-between items-center w-full">
                  <button className="flex-1 flex items-center justify-center gap-1 text-red-500">
                    <Heart size={20} />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1 text-blue-500">
                    <MessageCircle size={20} />
                    <span className="text-sm">{post.comments}</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1 text-green-500">
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
          </div>
        ))}
      </InfiniteScroll>
    </>
  );
};

export default FeedPosts;
