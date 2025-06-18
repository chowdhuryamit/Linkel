import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies._at;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Access denied! no token provided" });
    }
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!payload) {
      return res
        .status(400)
        .json({ success: false, message: "Access denied! invalid token" });
    }
    const user = await User.findById(payload._id).select(
      "-password -uid -providerId"
    );
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Access denied! user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "error ocured while validating user" });
  }
};

export{
    verifyJWT
}