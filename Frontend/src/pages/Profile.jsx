import React from "react";
import { useState } from "react";
import { ChevronLeft, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {PageNotFound} from "./index.js";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("posts"); // State to manage active tab
  const [isEditing, setIsEditing] = useState(false); // New state to toggle edit mode
  const navigate = useNavigate();

  const [userInfo, setUserData] = useState({
    name: "Jane Popova",
    handle: "@janepopova",
    email: "jane.popova@example.com",
    bio: "Designer for startups, passionate about creating beautiful and functional user experiences.",
    tags: ["UI/UX Design", "Web Development", "Product Management", "Branding"],
    posts: "124",
    followers: "3.5K",
    following: "256",
    profilePic: "https://placehold.co/128x128/a78bfa/ffffff?text=JP", // Placeholder image
  });
  const userStatus = useSelector((state) => state.authStatus.status);
  const userData = useSelector((state) => state.authStatus.userData);

  // State to hold temporary edits before saving
  const [tempUserData, setTempUserData] = useState(userData);

  // Handle input changes in edit mode
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "tags") {
      // Convert comma-separated string to array for tags
      setTempUserData({
        ...tempUserData,
        [name]: value.split(",").map((tag) => tag.trim()),
      });
    } else {
      setTempUserData({ ...tempUserData, [name]: value });
    }
  };

  // Save changes
  const handleSave = () => {
    setUserData(tempUserData); // Update main userData with temp changes
    setIsEditing(false); // Exit edit mode
  };

  // Cancel edits
  const handleCancel = () => {
    setTempUserData(userInfo); // Revert tempUserData to original
    setIsEditing(false); // Exit edit mode
  };

  if(!userStatus || !userData) return <PageNotFound/>
  return (
    <div>
      <div
        className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans"
        style={{
          backgroundImage:
            "linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%)",
        }}
      >
        <div
          className="rounded-3xl shadow-xl p-6 sm:p-8 w-full max-w-xl md:max-w-2xl lg:max-w-3xl"
          style={{
            backgroundImage:
              "linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)",
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <ChevronLeft className="text-white hover:scale-150 hover:text-yellow-500" onClick={()=>navigate('/home')}/>
            {/* Edit Button - show only when not editing */}
            {!isEditing && (
              <Pencil className="text-white hover:scale-150 hover:text-yellow-500"
                onClick={() => {
                  setIsEditing(true);
                  setTempUserData(userInfo);
                }}
              />
            )}
            {/* Settings Icon - hide when editing */}
            {isEditing && (
              <div className="h-6 w-6"></div> /* Placeholder to maintain layout */
            )}
          </div>

          {/* Profile Info */}
          <div className="flex flex-col items-center mb-6 sm:mb-8 text-center">
            <img
              src={userData.picture}
              alt="Profile"
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-slate-500 shadow-md mb-4"
            />

            {isEditing ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={tempUserData.name}
                  onChange={handleChange}
                  className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-1 text-center bg-gray-100 dark:bg-gray-700 rounded-md py-1 px-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-1">
                  {tempUserData.handle}
                </p>{" "}
                {/* Handle not editable */}
                <input
                  type="email"
                  name="email"
                  value={tempUserData.email}
                  onChange={handleChange}
                  className="text-blue-500 dark:text-blue-400 hover:underline text-sm sm:text-base mb-4 text-center bg-gray-100 dark:bg-gray-700 rounded-md py-1 px-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <textarea
                  name="bio"
                  value={tempUserData.bio}
                  onChange={handleChange}
                  rows="3"
                  className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed max-w-md mb-4 w-full bg-gray-100 dark:bg-gray-700 rounded-md py-1 px-2 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                ></textarea>
              </>
            ) : (
              <>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
                  {userData.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-1">
                  {userData.username}
                </p>
                <a
                  href={`mailto:${userInfo.email}`}
                  className="text-blue-500 dark:text-blue-400 hover:underline text-sm sm:text-base mb-4"
                >
                  {userData.email}
                </a>
                <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed max-w-md mb-4">
                  {userInfo.bio}
                </p>
              </>
            )}

            {/* Tags/Skills - display or edit based on isEditing */}
            {isEditing ? (
              <div className="w-full max-w-md mb-6">
                <input
                  type="text"
                  name="tags"
                  value={tempUserData.tags.join(", ")} // Display as comma-separated string for editing
                  onChange={handleChange}
                  placeholder="Add tags, separated by commas"
                  className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm sm:text-base px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            ) : (
                userInfo.tags &&
                userInfo.tags.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {userInfo.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 dark:bg-purple-700 text-purple-800 dark:text-purple-200 text-xs sm:text-sm font-medium px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )
            )}

            {/* Action Buttons (Follow/Message or Save/Cancel) */}
            <div className="flex space-x-3 sm:space-x-4 w-full max-w-sm">
              {isEditing && (
                <>
                  <button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-sm sm:text-base"
                    onClick={handleSave}
                  >
                    Save Changes
                  </button>
                  <button
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 text-sm sm:text-base"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4 border-t border-b border-gray-200 dark:border-gray-700 py-4 sm:py-6 mb-6 sm:mb-8">
            <div className="text-center">
              <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                {userInfo.posts}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                Posts
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                {userInfo.followers}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                Followers
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                {userInfo.following}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                Following
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-around mb-6 sm:mb-8">
            <button
              className={`pb-2 px-4 font-medium text-sm sm:text-base ${
                activeTab === "posts"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              } transition-colors duration-200 focus:outline-none`}
              onClick={() => setActiveTab("posts")}
            >
              Posts
            </button>
            <button
              className={`pb-2 px-4 font-medium text-sm sm:text-base ${
                activeTab === "saved"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              } transition-colors duration-200 focus:outline-none`}
              onClick={() => setActiveTab("saved")}
            >
              Saved
            </button>
          </div>

          {/* Content Area (Placeholder) */}
          <div className="min-h-[200px] flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-gray-500 dark:text-gray-400">
            {activeTab === "posts" && <p>Your posts will appear here.</p>}
            {activeTab === "likes" && (
              <p>Content you liked will appear here.</p>
            )}
            {activeTab === "saved" && <p>Saved content will appear here.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
