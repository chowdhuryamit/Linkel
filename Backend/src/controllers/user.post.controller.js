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
  const uploadedData = req.body;
  if (!uploadedData && !req.file) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Please provide either text or video or image to upload",
      });
  }
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
          text: uploadedData.text,
          video: result.secure_url,
          owner: req.user._id,
          visibility: uploadedData.visibility,
          fileType: "video",
        });

        if (!newPost) {
          return res
            .status(400)
            .json({
              success: false,
              message: "error occured while creating new post.try again",
            });
        }
        return res
          .status(200)
          .json({ success: true, message: "post created successfully" });
      } else {
        const newPost = await Post.create({
          text: uploadedData.text,
          picture: result.secure_url,
          owner: req.user._id,
          visibility: uploadedData.visibility,
          fileType: "picture",
        });

        if (!newPost) {
          return res
            .status(400)
            .json({
              success: false,
              message: "error occured while creating new post.try again",
            });
        }
        return res
          .status(200)
          .json({ success: true, message: "post created successfully" });
      }
    } else {
      const newPost = await Post.create({
        text: uploadedData.text,
        owner: req.user._id,
        visibility: uploadedData.visibility,
      });

      if (!newPost) {
        return res
          .status(400)
          .json({
            success: false,
            message: "error occured while creating new post.try again",
          });
      }
      return res
        .status(200)
        .json({ success: true, message: "post created successfully" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: "error occured while uploading post try again!!",
      });
  }
};


const getFeedPost = async (req,res) => {
  if(!req.user){
    return res.status(400).json({success:false,message:"unauthorized.please login to enjoy your feed"});
  }
  try {
    const {page=1,limit=2}=req.query;
    const parsedLimit = parseInt(limit,10);
    const parsedPage = parseInt(page,10);
    const pageSkip = (parseInt(parsedPage,10)-1)*parsedLimit;
    const sortStage = {};
    sortStage["createdAt"] = -1;

    const posts = await Post.aggregate([
      {
        $match:{
          visibility:'public'
        }
      },
      {
        $lookup:{
          from:'users',
          localField:'owner',
          foreignField:'_id',
          as:'owner',
          pipeline:[
            {
              $project:{
                name:1,
                picture:1,
                username:1
              }
            }
          ]
        }
      },
      {
        $unwind:'$owner'
      },
      {
        $sort:sortStage
      },
      {
        $skip:pageSkip
      },
      {
        $limit:parsedLimit
      }
    ])

    const totalDocuments = await Post.countDocuments({
      visibility:'public'
    });
    const totalPages = Math.ceil(totalDocuments/parsedLimit);
    if(!posts || !totalDocuments){
      return res.status(400).json({success:false,message:"no posts found"});
    }
    else{
      return res.status(200).json({success:true,message:"posts fetched successfully",posts,haMore:parsedPage<totalPages});
    }
  } catch (error) {
    console.log(error);
    
    return res.status(400).json({success:false,message:"error occured while fetching posts"});
  }
}

export { createPost,getFeedPost };
