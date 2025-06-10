import admin from "../firebase/firebase.config.js";
import { User } from "../models/user.model.js";

const userGoogleSignup = async (req, res) => {
  try {
    const { idToken } = req.body;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if ( decodedToken.name &&
      decodedToken.email &&
      decodedToken.uid
    ) {
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
          providerId: "google",
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

            return res
              .status(200)
              .cookie("accessToken", accessToken, options)
              .json({
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

export { userGoogleSignup };
