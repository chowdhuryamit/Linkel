import React from "react";
import { useSelector } from "react-redux";
import {Heart,
    MessageCircle,
    Share2} from 'lucide-react'
import {fetchUserSavedPosts} from '../service/fetchUserSavedPosts'

const UserPosts = ({axios,dispatch,toast,activeTab}) => {
    const savedPosts = useSelector((state) => state.authStatus.savedPosts);

    const handleRemoveBookmark = async (id) => {
      try {
        const Id = id.toString();
        
        const res = await axios.delete( `http://localhost:8000/api/u3/remove/user/savedPost?id=${Id}`,{withCredentials:true});
        if(res.data.success){
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    };
    
  return (
    <>
      {activeTab === "saved" && savedPosts.length <= 0 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-center">You dont have any saved post.</p>
        </div>
      )}

      {activeTab === "saved" && savedPosts.length > 0 && (
        <div className="flex flex-col space-y-4">
          {savedPosts.map((userpost) => (
            <div
              key={userpost._id}
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col sm:flex-row transition-transform duration-200 hover:scale-[1.05] transform"
            >
              <div className="sm:w-1/3 flex-shrink-0">
                {userpost.fileType === "picture" && (
                  <img
                    src={userpost.picture}
                    alt={userpost.text}
                    className="w-full h-48 sm:h-full object-cover object-center rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none"
                  />
                )}
                {userpost.fileType === "video" && (
                  <video
                    src={userpost.video}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full rounded-lg mb-4 object-cover"
                  />
                )}
                {userpost.fileType === "none" && (
                  <div className="flex items-center justify-center text-gray-500 space-x-2 text-center">
                    <span>No image or video available</span>
                  </div>
                )}
              </div>
              <div className="p-5 flex flex-col sm:w-2/3 flex-grow">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {userpost.text}
                </h2>
                <div className="flex justify-between items-center text-xs text-gray-500 mt-auto pt-2">
                  <span>By: {userpost.owner.name}</span>
                  <span>
                    {new Date(userpost.createdAt).toLocaleString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </div>
                <div className="flex items-center space-x-6 text-gray-700 mt-4">
                  <div className="flex items-center">
                    <Heart size={18} className="text-red-500 mr-1" />
                    <span className="text-sm">{userpost.likes}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle size={18} className="text-blue-500 mr-1" />
                    <span className="text-sm">{userpost.comments}</span>
                  </div>
                  <div className="flex items-center">
                    <Share2 size={18} className="text-green-500 mr-1" />
                    <span className="text-sm">{userpost.shares}</span>
                  </div>
                </div>
                <button onClick={()=>handleRemoveBookmark(userpost._id)} className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 shadow-sm hover:shadow-md">
                  Remove post
                </button>
              </div>
            </div>
          ))}
          <button
            className="bg-green-500 text-white rounded-xl hover:font-bold hover:bg-green-600 duration-200"
            onClick={() => fetchUserSavedPosts({axios,savedPosts,dispatch,toast})}
          >
            Get more
          </button>
        </div>
      )}
    </>
  );
};

export default UserPosts;
