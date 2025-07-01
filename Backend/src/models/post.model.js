import mongoose from "mongoose";

const postSchemma = new mongoose.Schema({
    text:{
        type:String,
        trim:true
    },
    picture:{
        type:String,
    },
    video:{
        type:String,
    },
    likes:{
        type:Number,
        default:0
    },
    comments:{
        type:Number,
        default:0,
    },
    shares:{
        type:Number,
        default:0
    },
    visibility:{
        type:String,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true})

const Post = mongoose.model("post",postSchemma);

export{
    Post
}