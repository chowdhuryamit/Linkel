// import streamifier from "streamifier";
// import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { Follower } from "../models/followers.model.js";
import mongoose from "mongoose";
import { MutualFriends } from "../models/friendList.model.js";

dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
//   secure: true,
// });

const followUser = async (req, res) => {
  if (!req.user) {
    return res
      .status(400)
      .json({
        success: false,
        message: "you are not authorized.please login to follow anyone.",
      });
  }
  try {
    const { userId } = req.body;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "user id is required" });
    }
    const userExist = await User.findById(userId);
    if (!userExist) {
      return res
        .status(400)
        .json({ success: false, message: "user does not exist" });
    }
    const alreadyFollow = await Follower.findOne({
      following: userId,
      follower: req.user._id,
    });
    if (alreadyFollow) {
      console.log("hello");

      return res
        .status(200)
        .json({
          success: false,
          message: `you already follow ${userExist.name}`,
        });
    }

    const follow = await Follower.create({
      following: userId,
      follower: req.user._id,
    });
    if (!follow) {
      return res
        .status(400)
        .json({ success: false, message: "you are not following" });
    } else {
      const xFolllowY = await Follower.findOne({
        following: userId,
        follower: req.user._id,
      });
      const yFollowX = await Follower.findOne({
        following: req.user._id,
        follower: userId,
      });
      if (xFolllowY && yFollowX) {
        let xFriendList = await MutualFriends.findOne({userId:userId});
        if(!xFriendList){
          await MutualFriends.create({userId:userId,friendList:[req.user._id]});
        }
        else{
          if(!xFriendList.friendList.includes(req.user._id.toString())){
            xFriendList.friendList.push(req.user._id);
            await xFriendList.save();
          }
        }
        let yFriendList = await MutualFriends.findOne({userId:req.user._id});
        if(!yFriendList){
          await MutualFriends.create({userId:req.user._id,friendList:[userId]});
        }
        else{
          if(!yFriendList.friendList.includes(userId.toString())){
            yFriendList.friendList.push(userId);
            await yFriendList.save();
          }
        }
      }
      return res
        .status(200)
        .json({
          success: true,
          message: `you started to follow ${userExist.name}`,
        });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "error occured while following" });
  }
};

const unfollowUser = async (req, res) => {
  if (!req.user) {
    return res
      .status(400)
      .json({
        success: false,
        message: "you are not authorized.please login to follow anyone.",
      });
  }
  try {
    const { userId } = req.body;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "user id is required" });
    }
    const userExist = await User.findById(userId);
    if (!userExist) {
      return res
        .status(400)
        .json({ success: false, message: "user does not exist" });
    }
    await MutualFriends.findOneAndUpdate({userId:userId},{$pull:{friendList:req.user._id}});
    await MutualFriends.findOneAndUpdate({userId:req.user._id},{$pull:{friendList:userId}});
    const follow = await Follower.findOneAndDelete({
      following: userId,
      follower: req.user._id,
    });
    if (!follow) {
      return res
        .status(400)
        .json({ success: false, message: "you are not following" });
    } else {
      return res
        .status(200)
        .json({ success: true, message: `you Unfollow ${userExist.name}` });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "error occured while following" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(400)
        .json({
          success: false,
          message: "you are not authorized.please login",
        });
    }
    const { userId } = req.query;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "user id is required" });
    }
    if (new mongoose.Types.ObjectId(userId).equals(req.user._id)) {
      return res
        .status(200)
        .json({ success: false, message: "this is your account" });
    }
    const userExist = await User.findById(userId).select(
      "-password -email -uid -gender -dob -providerId -savedPosts"
    );
    if (!userExist) {
      return res
        .status(400)
        .json({ success: false, message: "user does not exist" });
    }
    if (!userExist.public) {
      return res
        .status(200)
        .json({
          success: false,
          userData: null,
          message: "This account is private",
        });
    }

    const followers = await Follower.countDocuments({
      following: userExist._id,
    });
    const following = await Follower.countDocuments({
      follower: userExist._id,
    });
    const posts = await Post.countDocuments({
      owner: userExist._id,
    });

    const userData = userExist.toObject();
    userData.followers = followers;
    userData.following = following;
    userData.posts = posts;

    return res
      .status(200)
      .json({
        success: true,
        userData,
        message: "user data fetched successfully",
      });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export { followUser, unfollowUser, getUserProfile };
