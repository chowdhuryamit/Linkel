import React, { useEffect, useState } from "react";
import {
  Image,
  Video,
  BarChart,
  ChevronDown,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Share2,
  X,
} from "lucide-react";
import {
  posts,
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
} from "../components/index.js";
import { useSelector } from "react-redux";

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

  //my hooks
  const navigate = useNavigate();
  const userStatus = useSelector((state) => state.authStatus.status);
  const userData = useSelector((state) => state.authStatus.userData);
  console.log(userData)

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
            <p className="text-gray-500 text-sm">{userData.username}</p>
            <div className="flex justify-around w-full mt-4 text-center">
              <div>
                <p className="font-bold">250</p>
                <p className="text-gray-500 text-xs">Post</p>
              </div>
              <div>
                <p className="font-bold">2022</p>
                <p className="text-gray-500 text-xs">Followers</p>
              </div>
              <div>
                <p className="font-bold">590</p>
                <p className="text-gray-500 text-xs">Following</p>
              </div>
            </div>
            <button className="mt-5 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full" onClick={()=>navigate('/profile')}>
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
        <main className="col-span-1 md:col-span-6 lg:col-span-6 space-y-4 overflow-y-auto">
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
            <div className="bg-white rounded-xl shadow-sm p-4">
              <BookmarkPage />
            </div>
          )}
          {/* Only show post feed and share card if no specific section is active */}
          {!activeSection && (
            <>
              {/* Share Something Card */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="https://placehold.co/40x40/FFDDC1/1F2937?text=Y" // Your avatar placeholder
                    alt="Your Avatar"
                    className="w-10 h-10 rounded-full border-2 border-gray-200"
                  />
                  <input
                    type="text"
                    placeholder="Share something..."
                    className="flex-grow py-2 px-4 bg-gray-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {/* Buttons for image, video, poll, and public setting */}
                <div className="flex items-center justify-start flex-wrap gap-x-6 gap-y-2">
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                      <Image size={20} />
                      <span>Image</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                      <Video size={20} />
                      <span>Video</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                      <BarChart size={20} />
                      <span>Poll</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-gray-600">Public</span>
                    <ChevronDown size={16} className="text-gray-500" />
                  </div>
                </div>
              </div>
              {/* Post Feed - Iterates through the posts array to display each post */}
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl shadow-sm p-4"
                >
                  {/* Post Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.userAvatar}
                        alt={`${post.userName} Avatar`}
                        className="w-10 h-10 rounded-full border-2 border-gray-200"
                      />
                      <div>
                        <p className="font-semibold text-base">
                          {post.userName}
                        </p>
                        <p className="text-gray-500 text-sm">{post.time}</p>
                      </div>
                    </div>
                    <MoreHorizontal
                      size={20}
                      className="text-gray-500 cursor-pointer"
                    />
                  </div>

                  {/* Post Content */}
                  <p className="mb-3 text-gray-800">{post.text}</p>
                  <img
                    src={post.imageUrl}
                    alt="Post Image"
                    className="w-full h-auto rounded-lg mb-4 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/600x400/D1D5DB/1F2937?text=Image+Load+Error";
                    }} // Fallback for image loading errors
                  />

                  {/* Post Engagement (Likes, Comments, Shares) */}
                  <div className="flex items-center justify-between border-t border-b border-gray-100 py-3 mb-3">
                    <div className="flex items-center gap-5">
                      <button className="flex items-center gap-1 text-gray-600 hover:text-red-500">
                        <Heart size={20} />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500">
                        <MessageCircle size={20} />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-600 hover:text-green-500">
                        <Share2 size={20} />
                        <span className="text-sm">{post.shares}</span>
                      </button>
                    </div>
                  </div>

                  {/* Write a comment section */}
                  <div className="flex items-center gap-3">
                    <img
                      src="https://placehold.co/30x30/FFDDC1/1F2937?text=Y" // Your avatar placeholder
                      alt="Your Avatar"
                      className="w-8 h-8 rounded-full border-2 border-gray-200"
                    />
                    <input
                      type="text"
                      placeholder="Write your comment"
                      className="flex-grow py-2 px-4 bg-gray-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>
              ))}
            </>
          )}
        </main>
        {/* Right Sidebar - Responsive positioning for mobile (fixed) and desktop (static) */}
        <aside
          className={`fixed md:static top-0 right-0 w-64 md:w-auto h-full md:h-full bg-white rounded-xl shadow-lg md:shadow-sm p-4 transform transition-transform duration-300 ease-in-out z-30 md:z-auto
          ${
            isRightSidebarOpen ? "translate-x-0" : "translate-x-full"
          } md:translate-x-0 md:col-span-3 lg:col-span-3 overflow-y-auto`}
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
