import mongoose from "mongoose";

const followersSchemma = new mongoose.Schema({
    following:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    follower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
},{timestamps:true});

const Follower = mongoose.model('follower',followersSchemma);

export{
    Follower
}