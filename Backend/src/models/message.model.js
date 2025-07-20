import mongoose from "mongoose";

const messageSchemma = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:user,
        required:true,
        trim:true,
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:user,
        required:true,
        trim:true,
    },
    message:{
        type:String,
        trim:true,
    },
    seen:{
        type:Boolean,
        default:false,
    }
},{timestamps:true});

const Message = mongoose.model('message',messageSchemma);
export{
    Message
}