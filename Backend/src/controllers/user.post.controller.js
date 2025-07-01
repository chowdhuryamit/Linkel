import streamifier from "streamifier";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { Post } from "../models/post.model.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

const createPost = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(400)
        .json({ success: false, message: "you are unauthorized" });
    }
    let result = "";
    let fileType = "";
    if (req.file) {
      const streamUpload = (buffer, mimetype) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "linkel_posts_assets",
              resource_type: mimetype.startsWith("video") ? "video" : "image",
            },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(buffer).pipe(stream);
        });
      };

      fileType = req.file.mimetype;
      result = await streamUpload(req.file.buffer, fileType);

      if (!result) {
        return res.status(400).json({
          success: false,
          message: "file uploading failed! try again.",
        });
      }
      if (fileType.startsWith("video")) {
        const newPost = await Post.create({
            
        }) 
      }
    }
    
  } catch (error) {}
};

export { createPost };
