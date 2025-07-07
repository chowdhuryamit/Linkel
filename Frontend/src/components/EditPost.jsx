import React, { useState } from "react";
import { Image, Video, BarChart, X, SendHorizonal } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const EditPost = ({ post, onClose }) => {
  const [text, setText] = useState(post.text);
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [postPrivacy, setPostPrivacy] = useState("public");
  const [loading, setLoading] = useState(false);

  const handleMediaSelect = (type) => {
    document.getElementById(`upload-${type}`).click();
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
      setMediaType(type);
    }
  };

  const removeMedia = () => {
    setMedia(null);
    setMediaType(null);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("text", text);
    formData.append("visibility", postPrivacy);
    formData.append("owner",post.owner._id);
    formData.append("postId",post._id);
    if (media) {
      formData.append("media", media);
      //formData.append("type", mediaType);
    }
    try {
      const res = await axios.patch(
        "http://localhost:8000/api/u3/update/user/post",
        formData,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        //setIsExpanded(false);
        setText("");
        setMedia(null);
        setMediaType(null);
        setPostPrivacy("public");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-2xl mx-auto transition-all duration-300">
        <>
          {/* User Info */}
          {post && (
            <div className="flex items-center gap-3 mb-4">
              <img
                src={post.owner.picture}
                alt={post.owner.name}
                className="w-10 h-10 rounded-full border-2 border-blue-500"
                crossOrigin="anonymous"
              />
              <div>
                <p className="font-semibold text-base">{post.owner.name}</p>
                <p className="text-sm text-gray-500">@{post.owner.username}</p>
              </div>
            </div>
          )}

          {/* Text Area */}
          <textarea
            placeholder="What's on your mind?"
            className="w-full p-3 text-gray-700 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-3"
            rows="3"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          {/* Media Preview */}
          {media ? (
            <div className="relative mb-4">
              {mediaType === "image" ? (
                <img
                  src={URL.createObjectURL(media)}
                  alt="preview"
                  className="w-full rounded-md max-h-64 object-contain"
                />
              ) : (
                <video
                  controls
                  src={URL.createObjectURL(media)}
                  className="w-full rounded-md max-h-64"
                />
              )}
              <button
                onClick={removeMedia}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                title="Remove"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <div className="relative mb-4">
              {post.fileType === "picture" && 
                <img
                  src={post.picture}
                  alt="preview"
                  className="w-full rounded-md max-h-64 object-contain"
                />
              }
              {post.fileType === 'video' &&
               <video src={post.video} controls className="w-full rounded-md max-h-64"/>
              }
            </div>
          )}

          {/* Media buttons + Privacy */}
          <div className="flex items-center justify-between flex-wrap gap-y-3">
            <div className="flex gap-5 items-center">
              <button
                onClick={() => handleMediaSelect("image")}
                className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
              >
                <Image size={20} />
                <span>Image</span>
              </button>
              <button
                onClick={() => handleMediaSelect("video")}
                className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
              >
                <Video size={20} />
                <span>Video</span>
              </button>
              <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                <BarChart size={20} />
                <span>Poll</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="visibility" className="text-gray-600"></label>
              <select
                id="visibility"
                value={postPrivacy}
                onChange={(e) => setPostPrivacy(e.target.value)}
                className="bg-white text-gray-500 rounded-md"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>
          </div>

          {/* Hidden file inputs */}
          <input
            type="file"
            id="upload-image"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileChange(e, "image")}
          />
          <input
            type="file"
            id="upload-video"
            accept="video/*"
            className="hidden"
            onChange={(e) => handleFileChange(e, "video")}
          />

          {/* Action Buttons */}
          <div className="mt-5 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`flex items-center gap-2 px-5 py-2 rounded-full shadow-md transition ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                <>
                  <SendHorizonal size={18} />
                  <span>Post</span>
                </>
              )}
            </button>
          </div>
        </>
      </div>
    </div>
  );
};

export default EditPost;
