import admin from "../firebase/firebase.config.js";
import { User } from "../models/user.model.js";
import { Follower } from "../models/followers.model.js";
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

const userGoogleSignup = async (req, res) => {
  try {
    const { idToken } = req.body;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (decodedToken.name && decodedToken.email && decodedToken.uid) {
      const existingUser = await User.findOne({
        $or: [
          {
            email: decodedToken.email,
          },
          {
            uid: decodedToken.uid,
          },
        ],
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "User already exists" });
      } else {
        const newUser = await User.create({
          name: decodedToken.name,
          email: decodedToken.email,
          uid: decodedToken.uid,
          picture: decodedToken.picture,
          providerId: decodedToken.firebase.sign_in_provider,
          username: decodedToken.user_id,
        });

        if (!newUser) {
          return res.status(400).json({
            success: false,
            message: "error ocured while creating new user",
          });
        } else {
          const accessToken = await newUser.generateAccesstoken();

          if (!accessToken) {
            return res.status(400).json({
              success: false,
              message: "error while generating access token",
            });
          } else {
            const options = {
              httpOnly: true,
              secure: true,
              sameSite: "None",
            };

            const userData = newUser.toObject();
            userData.followers = 0;
            userData.following = 0;
            userData.posts = 0;
            delete userData.password;
            delete userData.uid;
            delete userData.providerId;
            

            return res.status(200).cookie("_at", accessToken, options).json({
              success: true,
              message: "user created successfully",
              userData,
            });
          }
        }
      }
    } else {
      return res.status(400).json({ success: false, message: "Invalid user" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "error occured while signup" });
  }
};

const userGoogleSignin = async (req, res) => {
  try {
    const { idToken, providerId, displayName, email, uid } = req.body;
    if (!idToken || !providerId || !displayName || !email || !uid) {
      return res
        .status(400)
        .json({ success: false, message: "credentails are missing" });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);

    if (
      decodedToken.name != displayName ||
      decodedToken.email != email ||
      decodedToken.uid != uid ||
      decodedToken.firebase.sign_in_provider != providerId
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user credentials" });
    } else {
      const existingUser = await User.findOne({ email, uid, providerId });
      if (!existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "user not found" });
      } else {
        const accessToken = await existingUser.generateAccesstoken();
        if (!accessToken) {
          return res.status(400).json({
            success: false,
            message: "error while generating access token",
          });
        }
        const options = {
          httpOnly: true,
          secure: true,
          sameSite: "None",
        };

        const followers = await Follower.countDocuments({
          following: existingUser._id,
        });
        const following = await Follower.countDocuments({
          follower: existingUser._id,
        });
        const posts = await Post.countDocuments({
          owner:existingUser._id
        })

        const userData = existingUser.toObject();
        userData.followers = followers;
        userData.following = following;
        userData.posts = posts;
        delete userData.uid;
        delete userData.providerId;
        delete userData.password;
        
        return res
          .status(200)
          .cookie("_at", accessToken, options)
          .json({
            success: true,
            userData,
            message: `${userData.name} logged in successfuly`,
          });
      }
    }
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "error occured while signin" });
  }
};

const getUser = async (req, res) => {
  if (!req.user) {
    return res
      .status(400)
      .json({ success: false, message: "user not logged in" });
  }

  const followers = await Follower.countDocuments({ following: req.user._id });
  const following = await Follower.countDocuments({ follower: req.user._id });
  const posts = await Post.countDocuments({owner:req.user._id});

  const userData = req.user.toObject();
  userData.followers = followers;
  userData.following = following;
  userData.posts = posts;

  return res.status(200).json({
    success: true,
    message: "user data fetched successfully",
    userData,
  });
};

const userLogout = async (req, res) => {
  if (!req.user) {
    return res
      .status(400)
      .json({ success: false, message: "user not logged in" });
  }

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  return res
    .status(200)
    .clearCookie("_at", options)
    .json({
      success: true,
      message: `${req.user.name} logged out successfully.`,
    });
};

const updateUserProfile = async (req, res) => {
  let userData = req.body;
  try {
    const usernameExist = await User.findOne({ username: userData.username });

    if (usernameExist && !usernameExist._id.equals(req.user._id)) {
      return res.status(400).json({
        success: false,
        message: "username already exist.try different username",
      });
    }

    if (!req.user) {
      return res
        .status(400)
        .json({ success: false, message: "user not authorized" });
    }

    const url = req.user.picture;
    const followers = await Follower.countDocuments({ following: req.user._id });
    const following = await Follower.countDocuments({ follower: req.user._id });
    const posts = await Post.countDocuments({owner:req.user._id});

    if (req.file) {
      
      const lastIndexBackslash = url.lastIndexOf("/");
      const lastIndexDot = url.lastIndexOf(".");
      const public_id = `linkel_profile_pics/${url.substring(
        lastIndexBackslash + 1,
        lastIndexDot
      )}`;
      if (public_id) {
        await cloudinary.uploader.destroy(public_id);
      }

      const streamUpload = (buffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "linkel_profile_pics",
            },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(buffer).pipe(stream);
        });
      };

      const result = await streamUpload(req.file.buffer);
      if (!result) {
        return res.status(400).json({
          success: false,
          message: "profile picture uploading failed! try again.",
        });
      }

      const updatedUser = await User.findByIdAndUpdate(req.user._id, {
        $set: {
          name: userData.name,
          bio: userData.bio,
          tags: JSON.parse(userData.tags),
          username: userData.username,
          picture: result.secure_url,
          public: userData.public,
        },
      },{new:true});

      userData = updatedUser.toObject();
      delete userData.password;
      delete userData.uid;
      delete userData.providerId;
      userData.followers = followers;
      userData.following = following;
      userData.posts = posts;

      return res.status(200).json({
        success: true,
        message: "profile updated successfully",
        userData,
      });
    }
    else{
      const updatedUser = await User.findByIdAndUpdate(req.user._id,{
        $set:{
          name:userData.name,
          bio:userData.bio,
          tags:JSON.parse(userData.tags),
          username:userData.username,
          public:userData.public,
        }
      },{new:true})
      userData = updatedUser.toObject();
      delete userData.password;
      delete userData.uid;
      delete userData.providerId;
      userData.followers = followers;
      userData.following = following;
      userData.posts = posts;

      return res.status(200).json({
        success: true,
        message: "profile updated successfully",
        userData,
      });
    }
  } catch (error) {

    return res.status(400).json({
      success: false,
      message: "error occured while updating information",
    });
  }
};

export {
  userGoogleSignup,
  userGoogleSignin,
  getUser,
  userLogout,
  updateUserProfile,
};
