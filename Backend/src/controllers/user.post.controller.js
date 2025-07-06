import streamifier from "streamifier";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { Follower } from "../models/followers.model.js";
import mongoose from "mongoose";

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
    return res.status(400).json({
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
          return res.status(400).json({
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
          return res.status(400).json({
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
        return res.status(400).json({
          success: false,
          message: "error occured while creating new post.try again",
        });
      }
      return res
        .status(200)
        .json({ success: true, message: "post created successfully" });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error occured while uploading post try again!!",
    });
  }
};

const getFeedPost = async (req, res) => {
  if (!req.user) {
    return res.status(400).json({
      success: false,
      message: "unauthorized.please login to enjoy your feed",
    });
  }
  try {
    const { page, limit = 2 } = req.query;
    //console.log(page);

    const parsedLimit = parseInt(limit, 10);
    const parsedPage = parseInt(page, 10);
    const pageSkip = (parseInt(parsedPage, 10) - 1) * parsedLimit;
    const sortStage = { createdAt: -1, _id: -1 };

    const posts = await Post.aggregate([
      {
        $match: {
          visibility: "public",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "owner",
          pipeline: [
            {
              $project: {
                name: 1,
                picture: 1,
                username: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$owner",
      },
      {
        $sort: sortStage,
      },
      {
        $skip: pageSkip,
      },
      {
        $limit: parsedLimit,
      },
    ]);

    const totalDocuments = await Post.countDocuments({
      visibility: "public",
    });
    const totalPages = Math.ceil(totalDocuments / parsedLimit);
    const hasMore = parsedPage < totalPages;

    if (!posts || !totalDocuments) {
      return res
        .status(400)
        .json({ success: false, message: "no posts found" });
    } else {
      return res.status(200).json({
        success: true,
        message: "posts fetched successfully",
        posts,
        hasMore,
      });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "error occured while fetching posts" });
  }
};

const savePost = async (req, res) => {
  if (!req.user) {
    return res
      .status(400)
      .json({ success: false, message: "you must be logged in to save post." });
  }
  try {
    const { postId } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(400)
        .json({ success: false, message: "post not found." });
    }
    if (post.visibility === "private" || post.owner.equals(req.user._id)) {
      return res
        .status(400)
        .json({ success: false, message: "post cant be saved." });
    }
    const pushedIntoArray = await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: {
          savedPosts: postId,
        },
      },
      { new: true }
    );
    if (pushedIntoArray) {
      return res
        .status(200)
        .json({ success: true, message: "post saved successfully" });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "post not saved" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "error occured while saving post" });
  }
};

const findFollowing = async (req, res) => {
  if (!req.user) {
    return res
      .status(400)
      .json({ success: false, message: "you are not authorized." });
  }
  try {
    const { userId } = req.query;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "post id is required." });
    }
    const userexist = await User.findById(userId);
    if (!userexist) {
      return res
        .status(400)
        .json({ success: false, message: "user does not exist." });
    }
    const isFollow = await Follower.findOne({
      following: userId,
      follower: req.user._id,
    });
    if (isFollow) {
      return res.status(200).json({ success: true, following: true });
    } else {
      return res.status(200).json({ success: true, following: false });
    }
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: "error occured while fetching following status.",
      });
  }
};

const getSavedPost = async (req, res) => {
  if (!req.user) {
    return res
      .status(400)
      .json({ success: false, message: "you are not authorized." });
  }
  try {
    const { page, limit = 2 } = req.query;

    const parsedLimit = parseInt(limit, 10);
    const parsedPage = parseInt(page, 10);
    const pageSkip = (parseInt(parsedPage, 10) - 1) * parsedLimit;
    const sortStage = { createdAt: -1, _id: -1 };
    

    const posts = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.user._id),
        },
      },
      {
        $project:{
          savedPosts:1
        }
      },
      {
        $lookup:{
          from:'posts',
          let:{savedPostIds:'$savedPosts'},
          pipeline:[
            {
              $match:{
                $expr:{
                  $in:['$_id',{
                    $map:{
                      input:'$$savedPostIds',
                      as:"id",
                      in:{$toObjectId:'$$id'},
                    }
                  }]
                }
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
                      username:1,
                      picture:1
                    }
                  }
                ]
              }
            },
            {
              $unwind:"$owner",
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
          ],
          as:'savedPosts'
        }
      }
    ])
    if(!posts){
      return res.status(200).json({success:false,message:'No posts found'})
    }
    else{
      const user = await User.findById(req.user._id).select("savedPosts")
      const totalPages = Math.ceil((user?.savedPosts?.length||0) / parsedLimit);
      const hasMore = parsedPage < totalPages;
      
      return res.status(200).json({success:true,message:'posts found',posts:posts[0]?.savedPosts,hasMore})
    }
    
  } catch (error) {
    
    return res.status(400).json({success:false,message:error.message})
  }
};

const removeSavedPost = async (req,res) =>{
  if(!req.user){
    return res.status(400).json({success:false,message:'Unauthorized.'})
  }
  try {
    const {id} = req.query;
    if(!id){
      return res.status(400).json({success:false,message:'post Id is required.'})
    }
    

    const user = await User.findByIdAndUpdate(req.user._id,{
      $pull:{
        savedPosts:id,
      }
    },{new:true})
    if(!user){
      return res.status(400).json({success:false,message:'Post not found.'})
    }
    else{
      return res.status(200).json({success:true,message:'Post removed from your Bookmark.'})
    }
  } catch (error) {
    return res.status(400).json({success:false,message:error.message});
  }
}

const getUserPosts = async (req,res) => {
  try {
    if(!req.user){
      return res.status(400).json({success:false,message:'Unauthorized.'});
    }
    const {totalPosts} = req.query;
    
    const limit = parseInt(2);
    const skip = parseInt(totalPosts);

    const posts = await Post.find({owner:req.user._id}).sort({createdAt:-1}).skip(skip).limit(limit);
    
    if(!posts){
      return res.status(200).json({success:false,message:'No posts found.'})
    }
    else if(posts.length<=0){
      return res.status(200).json({success:false,message:'you dont have no more posts'})
    }
    else{
      return res.status(200).json({success:true,message:'Posts found.',posts})
    }
  } catch (error) {
    return res.status(200).json({success:false,message:error.message});
  }
}

const getuserSavedPosts = async (req,res) => {
  try {
    if(!req.user){
      return res.status(400).json({success:false,message:'Unauthorized.'});
    }
    const {totalPosts} = req.query;
    const limit = parseInt(2);
    const skip = parseInt(totalPosts);
    const sortStage = { createdAt: -1, _id: -1 };

    const posts = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.user._id),
        },
      },
      {
        $project:{
          savedPosts:1
        }
      },
      {
        $lookup:{
          from:'posts',
          let:{savedPostIds:'$savedPosts'},
          pipeline:[
            {
              $match:{
                $expr:{
                  $in:['$_id',{
                    $map:{
                      input:'$$savedPostIds',
                      as:"id",
                      in:{$toObjectId:'$$id'},
                    }
                  }]
                }
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
                      username:1,
                      picture:1
                    }
                  }
                ]
              }
            },
            {
              $unwind:"$owner",
            },
            {
              $sort:sortStage
            },
            {
              $skip:skip
            },
            {
              $limit:limit
            }
          ],
          as:'savedPosts'
        }
      }
    ])

    if(!posts){
      return res.status(200).json({success:false,message:'No posts found.'})
    }
    else if(posts[0]?.savedPosts.length<=0){
      return res.status(200).json({success:false,message:'No more saved posts'})
    }
    else{
      return res.status(200).json({success:true,message:'Posts found.',posts:posts[0]?.savedPosts})
    }
  } catch (error) {
    return res.status(400).json({success:false,message:error.message});
  }
}

export { createPost, getFeedPost, savePost, findFollowing, getSavedPost,removeSavedPost,getUserPosts,getuserSavedPosts };
