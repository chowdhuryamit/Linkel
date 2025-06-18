import admin from "../firebase/firebase.config.js";
import { User } from "../models/user.model.js";

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
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
            };
            const userData = await User.findById(newUser._id).select(
              "-password -uid -providerId"
            );

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
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        };
        const userData = existingUser.toObject();
        delete userData.uid;
        delete userData.providerId;
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
  const userData = req.user.toObject();
  return res
    .status(200)
    .json({
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
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };

  return res
    .status(200)
    .clearCookie("_at", options)
    .json({
      success: true,
      message: `${req.user.name} logged out successfully.`,
    });
};

export { userGoogleSignup, userGoogleSignin, getUser, userLogout };
