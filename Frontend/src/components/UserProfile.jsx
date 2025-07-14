import React from "react";
import { useState, useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { Image, Video, BarChart, X, SendHorizonal } from "lucide-react";
import axios from "axios";
import { getUserProfile } from "../service/getUserProfile";

Chart.register(...registerables);

const UserProfile = ({ onClose, userId}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [userData,setUserData] = useState(null);
  const [message,setMessage] = useState(null);
  

  // Ref for the chart canvas element
  const chartRef = useRef(null);
  // Ref for the Chart.js instance
  const chartInstance = useRef(null);
  // Sample data for the chart
  const engagementData = {
    labels: ["Followers", "Following", "Posts"],
    datasets: [
      {
        label: "Engagement Metrics",
        data: [userData?userData.followers:0, userData?userData.following:0, userData?userData.posts:0], // Sample data
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

  useEffect(()=>{
    getUserProfile({axios,userId,setUserData,setMessage});
  },[userId])

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

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black text-white bg-opacity-50 overflow-y-auto">
        {!userData && message && <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 text-white ">{message}<X className="text-red-500 ml-3 bg-slate-100 rounded-md" onClick={onClose}/></div>}
        {userData && <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
          <main
            id="user-profile-card"
            className="relative rounded-2xl shadow-xl max-w-4xl w-full overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-300 text-slate-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-300 z-10"
              aria-label="Close profile"
            >
              <X className="text-red-500" />
            </button>

            <div className="p-4 sm:p-6 md:p-8">
              {/* Section 1: Profile Overview */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0">
                <div className="relative">
                  <img
                    id="profile-pic"
                    className="h-24 w-24 sm:h-32 sm:w-32 rounded-full border-4 border-blue-600 object-cover shadow-md"
                    src={userData.picture}
                    alt="User profile picture"
                  />
                  {/* <span
                    className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 h-4 w-4 sm:h-5 sm:w-5 bg-green-500 rounded-full border-2 border-white"
                    title="Online"
                  ></span> */}
                </div>
                <div className="text-green-400 flex-1 text-center sm:text-left sm:ml-6">
                  <h2 className=" text-2xl sm:text-3xl font-bold">
                    {userData.name}
                  </h2>
                  <p className="text-blue-500 text-sm sm:text-base">
                    {userData.username}
                  </p>
                  <p className="text-green-400 mt-2 text-sm sm:text-base max-w-lg mx-auto sm:mx-0">
                    {userData.bio}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {userData.tags.map((skill) => (
                      <span
                        key={skill}
                        className="bg-teal-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 2: Actions */}
              <div className="mt-6 flex flex-wrap justify-center sm:justify-start gap-3">
                <button
                  onClick={handleFollowClick}
                  className={`px-5 py-2 rounded-full font-medium transition-colors duration-200 ${
                    isFollowing
                      ? "bg-slate-300 text-slate-700"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
                <button className="bg-slate-100 text-slate-700 px-5 py-2 rounded-full font-medium hover:bg-slate-200 transition">
                  Message
                </button>
                <button className="bg-slate-100 text-slate-700 px-5 py-2 rounded-full font-medium hover:bg-slate-200 transition">
                  Share Profile
                </button>
              </div>

              {/* Section 3: Engagement Chart */}
              <div className="mt-8 border-t border-slate-200 pt-6">
                <h3 className="text-xl sm:text-2xl font-semibold mb-4">
                  Engagement Overview
                </h3>
                <p className=" text-sm sm:text-base mb-4">
                  This chart visualizes key engagement metrics, providing a
                  quick overview of {userData.name}'s activity and reach on the platform.
                </p>
                <div className="p-4 rounded-lg shadow-inner h-[300px] sm:h-[360px]">
                  <canvas ref={chartRef} id="engagementChart"></canvas>
                </div>
                <div className="flex justify-around text-center mt-6">
                  <div className="text-[#58cc5c]">
                    <p className="text-2xl font-bold">{userData.followers}</p>
                    <p className="text-sm">Followers</p>
                  </div>
                  <div className="text-[#54c0e8]">
                    <p className="text-2xl font-bold">{userData.following}</p>
                    <p className="text-sm">Following</p>
                  </div>
                  <div className="text-[#edd86f]">
                    <p className="text-2xl font-bold">{userData.posts}</p>
                    <p className="text-sm">Posts</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm mt-4 text-center text-slate-300">
                  Joined: {new Date(userData.createdAt).toLocaleString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })} | Last Active: 2 hours ago
                </p>
              </div>
            </div>
          </main>
        </div>}
      </div>
    </>
  );
};

export default UserProfile;
