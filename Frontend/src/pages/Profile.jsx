import React, { useEffect, useState, useRef } from "react";
import { ChevronLeft, Pencil, Camera } from "lucide-react"; // Import Camera icon
import { Globe, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PageNotFound } from "./index.js";
import axios from "axios";
import { login, addSavedPosts } from "../store/authSlice.js";
import { toast } from "react-toastify";
import { fetchUserPosts } from "../service/fetchUserPosts.js";
import { fetchUserSavedPosts } from "../service/fetchUserSavedPosts.js";
import { UserSavedPosts, UserPosts } from "../components/index.js";
import { Chart, registerables } from "chart.js";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("posts"); // State to manage active tab
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.authStatus.userData);
  const userStatus = useSelector((state) => state.authStatus.status);

  const userPosts = useSelector((state) => state.authStatus.userPosts);
  const savedPosts = useSelector((state) => state.authStatus.savedPosts);

  const [tempUserData, setTempUserData] = useState(userData);
  const [isPublic, setIsPublic] = useState(userData?.public);
  const [newProfilePic, setNewProfilePic] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "tags") {
      setTempUserData({
        ...tempUserData,
        [name]: value.split(",").map((tag) => tag.trim()),
      });
      console.log(tempUserData);
    } else {
      setTempUserData({ ...tempUserData, [name]: value });
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", tempUserData.name);
      formData.append("username", tempUserData.username);
      formData.append("bio", tempUserData.bio);
      formData.append("tags", JSON.stringify(tempUserData.tags));
      formData.append("public", isPublic);
      formData.append("picture", newProfilePic);

      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/u1/update/profile`,
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(login({ userData: res.data.userData }));
        toast.success(res.data.message);
        setIsEditing(false);
        setNewProfilePic(null);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleCancel = () => {
    setTempUserData(userData);
    setIsPublic(userData?.public);
    setIsEditing(false);
    setNewProfilePic(null);
  };

  useEffect(() => {
    if (userData && userPosts.length <= 0 && activeTab == "posts") {
      fetchUserPosts({ axios, userPosts, dispatch, toast });
    }
    if (userData && savedPosts.length <= 0 && activeTab == "saved") {
      fetchUserSavedPosts({ axios, savedPosts, dispatch, toast });
    }
  }, [activeTab]);

  // Ref for the chart canvas element
  const chartRef = useRef(null);
  // Ref for the Chart.js instance
  const chartInstance = useRef(null);
  // Sample data for the chart
  const engagementData = {
    labels: [`Followers ( ${userData?userData.followers:0} )`, `Following ( ${userData?userData.following:0} )`, `Posts ( ${userData?userData.posts:0} )`],
    datasets: [
      {
        label: "Engagement Metrics",
        data: [
          userData ? userData.followers : 0,
          userData ? userData.following : 0,
          userData ? userData.posts : 0,
        ], // Sample data
        backgroundColor: ["#58cc5c", "#54c0e8", "#edd86f"], // Slate-700, Slate-600, Slate-400
        borderColor: "#ffffff",
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };
  // Chart options for responsiveness and styling
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Crucial for respecting container dimensions
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            // Wrap title if it's too long
            const label = context[0].label;
            return label.length > 16
              ? label.match(/.{1,16}/g).join("\n")
              : label;
          },
        },
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 12,
        },
        padding: 10,
        cornerRadius: 6,
        displayColors: true,
        boxPadding: 4,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#ffffff", // slate-600
          font: {
            size: 12,
            weight: "500",
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#ffffff", // slate-200
        },
        ticks: {
          color: "#ffffff", // slate-600
          font: {
            size: 18,
          },
        },
      },
    },
  };

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(chartRef.current, {
        type: "bar",
        data: engagementData,
        options: chartOptions,
      });
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [engagementData]);

  if (!userStatus || !userData) return <PageNotFound />;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans"
      style={{
        backgroundImage: "linear-gradient(to top, #e8198b 0%, #c7eafd 100%)",
      }}
    >
      <div
        className="rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-xl md:max-w-2xl lg:max-w-3xl transform transition-all duration-300 ease-in-out hover:scale-[1.01]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #243949 0%, #517fa4 100%)",
        }}
      >
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <ChevronLeft
            className="text-gray-300 hover:text-cyan-400 hover:scale-110 transition-transform duration-200 cursor-pointer text-2xl sm:text-3xl"
            onClick={() => navigate("/home")}
          />

          <div className="flex flex-col items-center space-x-0">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsPublic(!isPublic)}
                  className="text-gray-300 hover:text-purple-400 hover:scale-110 transition-transform duration-200 cursor-pointer focus:outline-none mb-1" // Added mb-1 for spacing
                  title={
                    isPublic ? "Make Account Private" : "Make Account Public"
                  }
                >
                  {isPublic ? (
                    <Globe className="text-2xl sm:text-3xl" /> // Icon for public
                  ) : (
                    <Lock className="text-2xl sm:text-3xl" /> // Icon for private
                  )}
                </button>
                <p className="text-gray-300 text-xs sm:text-sm">
                  {isPublic ? "Public Account" : "Private Account"}
                </p>
              </>
            ) : (
              <>
                {isPublic ? (
                  <Globe className="text-2xl sm:text-3xl text-gray-300" /> // Icon for public
                ) : (
                  <Lock className="text-2xl sm:text-3xl text-gray-300" /> // Icon for private
                )}
                <p className="text-gray-300 text-xs sm:text-sm">
                  {isPublic ? "Public Account" : "Private Account"}
                </p>
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {!isEditing && (
              <Pencil
                className="text-gray-300 hover:text-emerald-400 hover:scale-110 transition-transform duration-200 cursor-pointer text-2xl sm:text-3xl"
                onClick={() => {
                  setIsEditing(true);
                  setTempUserData(userData);
                }}
              />
            )}
            {isEditing && <div className="w-6 h-6 sm:w-8 sm:h-8"></div>}
          </div>
        </div>

        <div className="flex flex-col items-center mb-6 sm:mb-8 text-center">
          <div className="relative">
            <img
              src={
                newProfilePic
                  ? URL.createObjectURL(newProfilePic)
                  : userData.picture
              }
              alt={userData.name}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-cyan-400 shadow-xl mb-4 transform transition-transform duration-300 hover:scale-105"
            />
            <>
              <input
                type="file"
                id="profilePicUpload"
                className="hidden"
                accept="image/*"
                onChange={(e) => setNewProfilePic(e.target.files[0])}
              />
              <label
                htmlFor="profilePicUpload" // Link label to hidden input
                className="absolute bottom-6 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer shadow-lg transition-colors duration-200 transform hover:scale-110"
                title="Change Profile Picture"
              >
                <Camera className="text-lg sm:text-xl" />
              </label>
            </>
          </div>

          {isEditing ? (
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
                placeholder="Your Username"
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

          {isEditing ? (
            <div className="w-full max-w-md mb-6">
              <input
                type="text"
                name="tags"
                value={tempUserData.tags ? tempUserData.tags.join(",") : ""} // Handle undefined tags
                onChange={handleChange}
                placeholder="Add skills/interests, separated by commas"
                className="bg-gray-500 text-gray-200 text-base sm:text-lg px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-4 focus:ring-cyan-500 transition-colors duration-200 placeholder-gray-400"
              />
            </div>
          ) : (
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

        <div className="p-4 rounded-lg shadow-inner h-[300px] sm:h-[360px] mb-4">
          <canvas ref={chartRef} id="engagementChart"></canvas>
        </div>

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

        <div className="min-h-[200px] rounded-xl p-4 text-gray-400 text-lg sm:text-xl shadow-inner">
          <UserPosts
            axios={axios}
            dispatch={dispatch}
            toast={toast}
            activeTab={activeTab}
            userData={userData}
          />
          <UserSavedPosts
            axios={axios}
            dispatch={dispatch}
            toast={toast}
            activeTab={activeTab}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
