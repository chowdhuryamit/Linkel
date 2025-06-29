import React from "react";
import { useState } from "react";
import { ChevronLeft, Pencil, Camera } from "lucide-react"; // Import Camera icon
import { Globe, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PageNotFound } from "./index.js";
import axios from "axios";
import {login,logout} from '../store/authSlice.js'
import { toast } from "react-toastify";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("posts"); // State to manage active tab
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const navigate = useNavigate();
  const dispatch  = useDispatch();

  const userData = useSelector((state) => state.authStatus.userData);
  const userStatus = useSelector((state) => state.authStatus.status);

  // State to hold temporary edits before saving
  const [tempUserData, setTempUserData] = useState(userData);

  // New state to manage account public/private status
  // Assuming userData might have an 'isPublic' property, defaulting to true if not present
  const [isPublic, setIsPublic] = useState(userData?.public);
  

  // New state for the selected profile picture file (File object)
  const [newProfilePic, setNewProfilePic] = useState(null);

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
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('name',tempUserData.name);
      formData.append('username',tempUserData.username);
      formData.append('bio',tempUserData.bio);
      formData.append('tags',tempUserData.tags);
      formData.append('public',tempUserData.public);
      formData.append('picture',newProfilePic);

      const res = await axios.patch('http://localhost:8000/api/u1/update/profile',formData,{withCredentials:true});
      
      if(res.data.success){
        console.log(res.data.userData);
        
        dispatch(login({userData:res.data.userData}));
        toast.success(res.data.message);
        setIsEditing(false); // Exit edit mode
        setNewProfilePic(null); // Clear the new profile pic state after saving
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Cancel edits
  const handleCancel = () => {
    setTempUserData(userData);
    setIsPublic(userData?.public) // Revert tempUserData to original
    setIsEditing(false); // Exit edit mode
    setNewProfilePic(null); // Clear the new profile pic state
  };

  // If user data or status is not available, show PageNotFound
  if (!userStatus || !userData) return <PageNotFound />;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans"
      style={{
        // A very subtle, clean blue-gray gradient background for a modern feel
        backgroundImage:
          "linear-gradient(to top, #e0eafc 0%, #cfd9ed 100%)",
      }}
    >
      <div
        className="rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-xl md:max-w-2xl lg:max-w-3xl transform transition-all duration-300 ease-in-out hover:scale-[1.01]"
        style={{
          // A deep, sophisticated dark blue-gray gradient for the card
          backgroundImage:
            "linear-gradient(to right top, #1A2A3A, #2C4258)",
        }}
      >
        {/* Header section with back button, privacy toggle, and edit icon */}
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <ChevronLeft
            className="text-gray-300 hover:text-cyan-400 hover:scale-110 transition-transform duration-200 cursor-pointer text-2xl sm:text-3xl"
            onClick={() => navigate("/home")} // Navigate back to home
          />

          <div className="flex flex-col items-center space-x-0"> {/* Changed to flex-col to stack icon and text */}
            {/* Toggle Privacy Button - always visible, but icons change */}
            {isEditing ?<><button
              onClick={() => setIsPublic(!isPublic)}
              className="text-gray-300 hover:text-purple-400 hover:scale-110 transition-transform duration-200 cursor-pointer focus:outline-none mb-1" // Added mb-1 for spacing
              title={isPublic ? "Make Account Private" : "Make Account Public"}
            >
              {isPublic ? (
                <Globe className="text-2xl sm:text-3xl" /> // Icon for public
              ) : (
                <Lock className="text-2xl sm:text-3xl" /> // Icon for private
              )}
            </button>
            {/* Text below the icon */}
            <p className="text-gray-300 text-xs sm:text-sm">
              {isPublic ? "Public Account" : "Private Account"}
            </p></>:<>
              {isPublic ? (
                <Globe className="text-2xl sm:text-3xl text-gray-300" /> // Icon for public
              ) : (
                <Lock className="text-2xl sm:text-3xl text-gray-300" /> // Icon for private
              )}
            {/* Text below the icon */}
            <p className="text-gray-300 text-xs sm:text-sm">
              {isPublic ? "Public Account" : "Private Account"}
            </p></>}
          </div>

          <div className="flex items-center space-x-4"> {/* Container for remaining buttons/placeholder */}
            {/* Edit Button - shown only when not in editing mode */}
            {!isEditing && (
              <Pencil
                className="text-gray-300 hover:text-emerald-400 hover:scale-110 transition-transform duration-200 cursor-pointer text-2xl sm:text-3xl"
                onClick={() => {
                  setIsEditing(true); // Enable edit mode
                  setTempUserData(userData); // Initialize temp data with current user data
                }}
              />
            )}
            {/* Placeholder to maintain layout when in editing mode (to prevent elements from shifting) */}
            {isEditing && <div className="w-6 h-6 sm:w-8 sm:h-8"></div>}
          </div>
        </div>

        {/* Profile Information section */}
        <div className="flex flex-col items-center mb-6 sm:mb-8 text-center">
          <div className="relative"> {/* Added relative positioning for the image and button */}
            <img
              src={userData.picture} // Use tempUserData.picture for preview (could be original or new temp URL)
              alt={userData.name} // Alt text for accessibility
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-cyan-400 shadow-xl mb-4 transform transition-transform duration-300 hover:scale-105"
            />
              <>
                <input
                  type="file"
                  id="profilePicUpload" // Unique ID for the input
                  className="hidden" // Hide the default file input
                  accept="image/*" // Accept only image files
                  onChange={(e)=>setNewProfilePic(e.target.files[0])}
                />
                <label
                  htmlFor="profilePicUpload" // Link label to hidden input
                  className="absolute bottom-6 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer shadow-lg transition-colors duration-200 transform hover:scale-110"
                  title="Change Profile Picture"
                >
                  <Camera className="text-lg sm:text-xl" /> {/* Camera icon */}
                </label>
              </>
          </div>

          {isEditing ? (
            // Render editable input fields when in editing mode
            <>
              <input
                type="text"
                name="name"
                value={tempUserData.name}
                onChange={handleChange}
                className="text-2xl sm:text-3xl font-extrabold text-white mb-2 text-center bg-gray-500 rounded-lg py-2 px-3 w-full max-w-sm focus:outline-none focus:ring-4 focus:ring-cyan-500 transition-colors duration-200 placeholder-gray-400"
                placeholder="Your Name"
              />
              <input
                type="text"
                name="username"
                value={tempUserData.username}
                onChange={handleChange}
                className="text-2xl sm:text-3xl font-extrabold text-white mb-2 text-center bg-gray-500 rounded-lg py-2 px-3 w-full max-w-sm focus:outline-none focus:ring-4 focus:ring-cyan-500 transition-colors duration-200 placeholder-gray-400"
                placeholder="Your Username" // Changed placeholder to be more accurate
              />
              <a
                href={`mailto:${userData.email}`}
                className="text-cyan-400 hover:underline text-base sm:text-lg mb-4 transition-colors duration-200"
              >
                {userData.email}
              </a>
              <textarea
                name="bio"
                value={tempUserData.bio}
                onChange={handleChange}
                rows="3"
                className="text-gray-200 text-base sm:text-lg leading-relaxed max-w-md mb-6 w-full bg-gray-500 rounded-lg py-2 px-3 resize-none focus:outline-none focus:ring-4 focus:ring-cyan-500 transition-colors duration-200 placeholder-gray-400"
                placeholder="Write a short bio about yourself..."
              ></textarea>
            </>
          ) : (
            // Render static profile information when not in editing mode
            <>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
                {userData.name}
              </h1>
              <p className="text-gray-300 text-base sm:text-lg mb-1">
                @{userData.username}
              </p>
              <a
                href={`mailto:${userData.email}`}
                className="text-cyan-400 hover:underline text-base sm:text-lg mb-4 transition-colors duration-200"
              >
                {userData.email}
              </a>
              <p className="text-gray-200 text-base sm:text-lg leading-relaxed max-w-md mb-6">
                {userData.bio}
              </p>
            </>
          )}

          {/* Tags/Skills section - displays as editable input or static tags */}
          {isEditing ? (
            <div className="w-full max-w-md mb-6">
              <input
                type="text"
                name="tags"
                value={tempUserData.tags ? tempUserData.tags.join(", ") : ""} // Handle undefined tags
                onChange={handleChange}
                placeholder="Add skills/interests, separated by commas"
                className="bg-gray-500 text-gray-200 text-base sm:text-lg px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-4 focus:ring-cyan-500 transition-colors duration-200 placeholder-gray-400"
              />
            </div>
          ) : (
            // Only render tags if userData.tags exists and has items
            userData.tags &&
            userData.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {userData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm sm:text-base font-medium px-4 py-1.5 rounded-full shadow-md transition-colors duration-200 cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )
          )}

          {/* Action Buttons (Save/Cancel in edit mode) */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full max-w-sm">
            {isEditing && (
              <>
                <button
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-emerald-400 focus:ring-opacity-75 text-base sm:text-lg"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
                <button
                  className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-rose-400 focus:ring-opacity-75 text-base sm:text-lg"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {/* Stats Section (Posts, Followers, Following) */}
        <div className="grid grid-cols-3 gap-4 border-t border-b border-gray-700 py-4 sm:py-6 mb-6 sm:mb-8">
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-white">
              {userData.posts} {/* Assuming userData has a 'posts' property */}
            </p>
            <p className="text-gray-300 text-sm sm:text-base">Posts</p>
          </div>
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-white">
              {userData.followers}
            </p>
            <p className="text-gray-300 text-sm sm:text-base">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-white">
              {userData.following}
            </p>
            <p className="text-gray-300 text-sm sm:text-base">Following</p>
          </div>
        </div>

        {/* Tabs for Posts and Saved content */}
        <div className="flex justify-around mb-6 sm:mb-8">
          <button
            className={`pb-2 px-4 font-medium text-base sm:text-lg relative group ${
              activeTab === "posts"
                ? "text-cyan-400 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-full after:h-0.5 after:bg-cyan-400 after:rounded-full"
                : "text-gray-400 hover:text-white"
            } transition-colors duration-300 focus:outline-none`}
            onClick={() => setActiveTab("posts")}
          >
            Posts
          </button>
          <button
            className={`pb-2 px-4 font-medium text-base sm:text-lg relative group ${
              activeTab === "saved"
                ? "text-cyan-400 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-full after:h-0.5 after:bg-cyan-400 after:rounded-full"
                : "text-gray-400 hover:text-white"
            } transition-colors duration-300 focus:outline-none`}
            onClick={() => setActiveTab("saved")}
          >
            Saved
          </button>
        </div>

        {/* Content Area (Placeholder for tab content) */}
        <div className="min-h-[200px] flex items-center justify-center bg-gray-800 rounded-xl p-4 text-gray-400 text-lg sm:text-xl shadow-inner">
          {activeTab === "posts" && (
            <p className="text-center">Your posts will appear here.</p>
          )}
          {activeTab === "likes" && ( // 'likes' tab not present in UI, but logic is here
            <p className="text-center">Content you liked will appear here.</p>
          )}
          {activeTab === "saved" && (
            <p className="text-center">Saved content will appear here.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
