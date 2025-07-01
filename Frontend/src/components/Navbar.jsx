import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutFunction } from "../service/logoutService.js";
import { toast } from "react-toastify";
import { logo } from "../assets/index.js";
import {
    Home,
    Bell,
    MessageSquare,
    Users,
    Bookmark,
    Search,
    Image,
    Video,
    BarChart,
    ChevronDown,
    MoreHorizontal,
    Heart,
    MessageCircle,
    Share2,
    UserCircle,
    PlusCircle,
    Settings,
    LogOut,
    Camera,
    Code,Menu,X,
  } from "lucide-react";


const Navbar = ({isLeftSidebarOpen,
    setIsLeftSidebarOpen,
    isRightSidebarOpen,
    setIsRightSidebarOpen,
    setActiveSection,}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logoutFunction(dispatch, navigate, toast, axios);
  };

  return (
    <nav className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between mb-4 flex-wrap gap-y-2 sticky top-0 z-10 md:z-30" style={{backgroundImage: "linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%)"}}>
      {/* Left Section: Logo and Left Sidebar Toggle for mobile */}
      <div className="flex-shrink-0 flex items-center gap-3">
        {/* Left Sidebar Toggle (Mobile Only) */}
        <button
          className="md:hidden p-1"
          onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
        >
          {/* Display X icon if sidebar is open, otherwise Menu icon */}
          {isLeftSidebarOpen ? (
            <X size={24} className="text-gray-600" />
          ) : (
            <Menu size={24} className="text-gray-600" />
          )}
        </button>
        {/* Application Logo/Name */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="logo" />
          <span className="text-4xl font-bold">
            <span className="text-blue-500">Li</span>
            <span className="text-pink-500">nk</span>
            <span className="text-green-500">el</span>
          </span>
        </div>
      </div>

      {/* Middle Section: Search bar - full width on mobile, centered and growing on larger screens */}
      <div className="relative w-full sm:w-auto flex-grow flex justify-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mt-2 sm:mt-0 order-last sm:order-none">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700"
          size={18}
        />
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 w-full bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right Section: Navigation Icons and Right Sidebar Toggle for mobile */}
      <div className="flex gap-4 sm:gap-6 items-center flex-wrap justify-center sm:justify-end">
        {/* Navigation icons, now visible on all screen sizes by removing 'hidden sm:block' */}
        <Home
          className="text-white hover:text-blue-600 cursor-pointer hover:scale-125"
          size={24}
          onClick={() => {
            navigate("/home"), setActiveSection(null);
          }}
        />
        <Bell
          className="text-white hover:text-blue-600 cursor-pointer hover:scale-125"
          size={24}
          onClick={() => setActiveSection("notifications")}
        />
        <MessageSquare
          className="text-white hover:text-blue-600 cursor-pointer hover:scale-125"
          size={24}
          onClick={() => setActiveSection("messages")}
        />
        <Bookmark
          className="text-white hover:text-blue-600 cursor-pointer hover:scale-125"
          size={24}
          onClick={() => setActiveSection("bookmarks")}
        />
        <LogOut
          className="text-white hover:text-blue-600 cursor-pointer hover:scale-125"
          size={24}
          onClick={handleLogout}
        />
        {/* Right Sidebar Toggle (Mobile Only) */}
        <button
          className="md:hidden p-1"
          onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
        >
          {/* Display X icon if sidebar is open, otherwise MoreHorizontal icon */}
          {isRightSidebarOpen ? (
            <X size={24} className="text-gray-600" />
          ) : (
            <MoreHorizontal size={24} className="text-gray-600" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
