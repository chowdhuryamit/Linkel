import mongoose from "mongoose"

const FriendListSchemma = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    friendList:{
        type: Array,
        default: [],
    }
})

const MutualFriends= mongoose.model('mutualFriend',FriendListSchemma);

export{
    MutualFriends
}