// import streamifier from "streamifier";
// import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { Follower } from "../models/followers.model.js";

dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
//   secure: true,
// });

const followUser = async (req,res) =>{
  if(!req.user){
    return res.status(400).json({success:false,message:'you are not authorized.please login to follow anyone.'});
  }
  try {
    const {userId} = req.body;
    if(!userId){
        return res.status(400).json({success:false,message:'user id is required'});
    }
    const userExist = await User.findById(userId);
    if(!userExist){
        return res.status(400).json({success:false,message:'user does not exist'});
    }
    const alreadyFollow = await Follower.findOne({
        following:userId,
        follower:req.user._id
    })
    if(alreadyFollow){
        console.log('hello');
        
        return res.status(200).json({success:false,message:`you already follow ${userExist.name}`});
    }

    const follow = await Follower.create({
        following:userId,
        follower:req.user._id
    })
    if(!follow){
        return res.status(400).json({success:false,message:'you are not following'});
    }
    else{
        return res.status(200).json({success:true,message:`you started to follow ${userExist.name}`});
    }
  } catch (error) {
    return res.status(400).json({success:false,message:'error occured while following'});
  }
}

const unfollowUser = async (req,res) =>{
    if(!req.user){
      return res.status(400).json({success:false,message:'you are not authorized.please login to follow anyone.'});
    }
    try {
      const {userId} = req.body;
      if(!userId){
          return res.status(400).json({success:false,message:'user id is required'});
      }
      const userExist = await User.findById(userId);
      if(!userExist){
          return res.status(400).json({success:false,message:'user does not exist'});
      }
      const follow = await Follower.findOneAndDelete({
          following:userId,
          follower:req.user._id
      })
      if(!follow){
          return res.status(400).json({success:false,message:'you are not following'});
      }
      else{
          return res.status(200).json({success:true,message:`you Unfollow ${userExist.name}`});
      }
    } catch (error) {
      return res.status(400).json({success:false,message:'error occured while following'});
    }
  }

export{
    followUser,
    unfollowUser
}