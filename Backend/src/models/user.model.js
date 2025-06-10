import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchemma = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
  },
  picture: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required:true
  },
  uid: {
    type: String,
    unique: true,
  },
  gender: {
    type: String,
    trim: true,
  },
  dob: {
    type: String,
    trim: true,
  },
  providerId:{
    type:String,
    trim:true
  }
});

userSchemma.pre("save", async function (next) {
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchemma.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchemma.methods.isUidCorrect = async function (uid) {
  return uid==this.uid;
};

userSchemma.methods.generateAccesstoken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

const User = mongoose.model('user',userSchemma);
export{
    User
}
