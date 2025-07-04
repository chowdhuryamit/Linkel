import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import {
  allActivities,
  allSuggestions,
  allShortcuts,
} from "../assets/details.jsx";
import { useNavigate } from "react-router-dom";
import {
  Notification,
  Messages,
  BookmarkPage,
  Navbar,
  CreatePost,
  FeedPosts,
} from "../components/index.js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { fetchPosts } from "../service/fetchPosts.js";
import { fetchSavedPosts } from "../service/fetchSavedPosts.js";

const Homepage = () => {
  //ui hooks
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
  const [showAllShortcuts, setShowAllShortcuts] = useState(false);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const activitiesToShow = showAllActivities
    ? allActivities
    : allActivities.slice(0, 4);
  const suggestionsToShow = showAllSuggestions
    ? allSuggestions
    : allSuggestions.slice(0, 4);
  const shortcutsToShow = allShortcuts.slice(
    0,
    showAllShortcuts ? allShortcuts.length : 4
  );
  const closeSidebars = () => {
    setIsLeftSidebarOpen(false);
    setIsRightSidebarOpen(false);
  };
//console.log(activeSection);

  //my hooks
  const navigate = useNavigate();
  const userStatus = useSelector((state) => state.authStatus.status);
  const userData = useSelector((state) => state.authStatus.userData);
  const [createPost, setCreatePost] = useState(false);
  const postRef = useRef(null);

  //feed hooks
  const [posts, setPosts] = useState([]);
  const pageRef = useRef(1);
  const loadingRef = useRef(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 3;
  
  //saved post hooks
  const [savedPost, setSavedPost] = useState([]);
  const pageRefSavedPost = useRef(1);
  const loadingRefSavedPost = useRef(false);
  const [hasMoreSavedPost, setHasMoreSavedPost] = useState(true);
  const limitSavedPost = 2;

  useEffect(() => {
    fetchPosts({
      loadingRef,
      axios,
      pageRef,
      limit,
      setPosts,
      setHasMore,
      toast,
    });
  }, []);

  useEffect(() => {
    if (activeSection === "bookmarks" && savedPost.length <= 0) {
      console.log(pageRefSavedPost);
      
      fetchSavedPosts({
        loadingRefSavedPost,
        axios,
        pageRefSavedPost,
        limitSavedPost,
        setSavedPost,
        setHasMoreSavedPost,
        toast,
      });
    }
  }, [activeSection]);

  useEffect(() => {
    if (createPost) {
      postRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    setCreatePost(false);
  }, [createPost]);

  useEffect(() => {
    if (!userStatus || userData == null) {
      navigate("/signup");
    }
  }, [userData, userStatus]);

  if (!userData) return null;
  return (
    <div
      className="min-h-screen font-inter text-gray-800 antialiased p-4 relative"
      style={{
        backgroundImage:
          "linear-gradient(to top, #dbdcd7 0%, #dddcd7 24%, #e2c9cc 30%, #e7627d 46%, #b8235a 59%, #801357 71%, #3d1635 84%, #1c1a27 100%)",
      }}
    >
      {/* Backdrop for mobile sidebars to dim background and capture clicks */}
      {(isLeftSidebarOpen || isRightSidebarOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={closeSidebars}
        ></div>
      )}

      {/* Top Navigation Bar */}
      <Navbar
        isLeftSidebarOpen={isLeftSidebarOpen}
        setIsLeftSidebarOpen={setIsLeftSidebarOpen}
        isRightSidebarOpen={isRightSidebarOpen}
        setIsRightSidebarOpen={setIsRightSidebarOpen}
        setActiveSection={setActiveSection}
        setCreatePost={setCreatePost}
      />

      {/* Main Content Area: Left Sidebar, Main Feed, Right Sidebar */}
      {/* The grid layout defines column spans for sidebars and main content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[calc(100vh-8rem)]">
        {" "}
        {/* Set height for the main content area to allow internal scrolling */}
        {/* Left Sidebar - Responsive positioning for mobile (fixed) and desktop (static) */}
        <aside
          className={`fixed md:static top-0 left-0 w-64 md:w-auto h-full md:h-full bg-white rounded-xl shadow-lg md:shadow-sm p-4 transform transition-transform duration-300 ease-in-out z-30 md:z-auto
          ${
            isLeftSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:col-span-3 lg:col-span-3 overflow-y-auto`}
          style={{
            backgroundImage:
              "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)",
          }}
        >
          {/* Close button for mobile sidebar */}
          <div className="flex justify-end md:hidden mb-4">
            <button onClick={() => setIsLeftSidebarOpen(false)} className="p-2">
              <X size={24} className="text-gray-600" />
            </button>
          </div>
          {/* User Profile Card */}
          <div className="flex flex-col items-center p-4 border-b border-gray-200 mb-4">
            <img
              src={userData.picture} // Placeholder avatar
              alt={userData.name}
              crossOrigin="anonymous"
              className="w-20 h-20 rounded-full mb-3 border-4 border-blue-500"
            />
            <h2 className="font-semibold text-lg">{userData.name}</h2>
            <p className="text-gray-700 text-sm">@ {userData.username}</p>
            <div className="flex justify-around w-full mt-4 text-center">
              <div>
                <p className="font-bold">{userData.posts}</p>
                <p className="text-gray-600 text-xs">Posts</p>
              </div>
              <div>
                <p className="font-bold">{userData.followers}</p>
                <p className="text-gray-600 text-xs">Followers</p>
              </div>
              <div>
                <p className="font-bold">{userData.following}</p>
                <p className="text-gray-600 text-xs">Following</p>
              </div>
            </div>
            <button
              className="mt-5 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full"
              onClick={() => navigate("/profile")}
            >
              My Profile
            </button>
          </div>

          {/* Your Shortcuts */}
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-base">Your shortcuts</h3>
              {/* See all button for shortcuts, only shown if there are more than 4 */}
              {allShortcuts.length > 4 && (
                <button
                  onClick={() => setShowAllShortcuts(!showAllShortcuts)}
                  className="text-blue-600 text-sm hover:underline focus:outline-none"
                >
                  {showAllShortcuts ? "Show less" : "See all"}
                </button>
              )}
            </div>
            <ul className="space-y-3">
              {shortcutsToShow.map((shortcut) => (
                <li
                  key={shortcut.id}
                  className="flex items-center gap-3 text-gray-700 hover:text-blue-600 cursor-pointer"
                >
                  <shortcut.icon size={20} />
                  <span>{shortcut.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        {/* Main Content Feed - Scrolls independently within its grid area */}
        <main
          className="col-span-1 md:col-span-6 lg:col-span-6 space-y-4 overflow-y-auto feed-scroll-wrapper"
          id="scrollableDiv"
          ref={postRef}
        >
          {" "}
          {/* Added overflow-y-auto for main content scroll */}
          {activeSection === "notifications" && (
            <div className="bg-white rounded-xl shadow-sm p-4">
              <Notification />
            </div>
          )}
          {activeSection === "messages" && (
            <div className="bg-white rounded-xl shadow-sm p-4">
              <Messages />
            </div>
          )}
          {activeSection === "bookmarks" && (
            <div className="bg-white rounded-xl shadow-sm p-4" style={{backgroundImage: "linear-gradient(to top, #3f51b1 0%, #5a55ae 13%, #7b5fac 25%, #8f6aae 38%, #a86aa4 50%, #cc6b8e 62%, #f18271 75%, #f3a469 87%, #f7c978 100%)"}}>
              <BookmarkPage
                userData={userData}
                savedPost={savedPost}
                hasMoreSavedPost={hasMoreSavedPost}
                fetchSavedPosts={()=>fetchSavedPosts({
                  loadingRefSavedPost,
                  axios,
                  pageRefSavedPost,
                  limitSavedPost,
                  setSavedPost,
                  setHasMoreSavedPost,
                  toast,
                })}
              />
            </div>
          )}
          {/* Only show post feed and share card if no specific section is active */}
          {!activeSection && (
            <>
              <CreatePost userData={userData} />
              {/* Post Feed - Iterates through the posts array to display each post */}
              <FeedPosts
                userData={userData}
                posts={posts}
                hasMore={hasMore}
                fetchPosts={()=>fetchPosts({
                  loadingRef,
                  axios,
                  pageRef,
                  limit,
                  setPosts,
                  setHasMore,
                  toast,
                })}
              />
            </>
          )}
        </main>
        {/* Right Sidebar - Responsive positioning for mobile (fixed) and desktop (static) */}
        <aside
          className={`fixed md:static top-0 right-0 w-64 md:w-auto h-full md:h-full bg-white rounded-xl shadow-lg md:shadow-sm p-4 transform transition-transform duration-300 ease-in-out z-30 md:z-auto
          ${
            isRightSidebarOpen ? "translate-x-0" : "translate-x-full"
          } md:translate-x-0 md:col-span-3 lg:col-span-3 overflow-y-auto`}
          style={{
            backgroundImage:
              "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)",
          }}
        >
          {/* Close button for mobile sidebar */}
          <div className="flex justify-start md:hidden mb-4">
            <button
              onClick={() => setIsRightSidebarOpen(false)}
              className="p-2"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>
          {/* Activity Section */}
          <div className="p-4 border-b border-gray-200 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-base">Activity</h3>
              {/* See all button for activities, only shown if there are more than 4 */}
              {allActivities.length > 4 && (
                <button
                  onClick={() => setShowAllActivities(!showAllActivities)}
                  className="text-blue-600 text-sm hover:underline focus:outline-none"
                >
                  {showAllActivities ? "Show less" : "See all"}
                </button>
              )}
            </div>
            <ul className="space-y-3">
              {activitiesToShow.map((activity) => (
                <li
                  key={activity.id}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={activity.userAvatar}
                      alt={`${activity.userName} Avatar`}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">{activity.userName}</span>{" "}
                        {activity.type === "follow"
                          ? "started following you."
                          : "liked your photo."}{" "}
                        <span className="text-gray-500 text-xs">
                          {activity.time}
                        </span>
                      </p>
                    </div>
                  </div>
                  {/* Follow button for 'follow' type activities */}
                  {activity.type === "follow" && (
                    <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs hover:bg-blue-200">
                      Follow
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Suggested for You Section */}
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-base">Suggested for you</h3>
              {/* See all button for suggestions, only shown if there are more than 4 */}
              {allSuggestions.length > 4 && (
                <button
                  onClick={() => setShowAllSuggestions(!showAllSuggestions)}
                  className="text-blue-600 text-sm hover:underline focus:outline-none"
                >
                  {showAllSuggestions ? "Show less" : "See all"}
                </button>
              )}
            </div>
            <ul className="space-y-3">
              {suggestionsToShow.map((suggestion) => (
                <li
                  key={suggestion.id}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={suggestion.userAvatar}
                      alt={`${suggestion.userName} Avatar`}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-sm">
                        {suggestion.userName}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {suggestion.relation}
                      </p>
                    </div>
                  </div>
                  <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs hover:bg-blue-200">
                    Follow
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Homepage;
