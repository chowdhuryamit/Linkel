import mongoose from "mongoose"

const FriendListSchemma = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    friendList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }]
})

const MutualFriends= mongoose.model('mutualFriend',FriendListSchemma);

export{
    MutualFriends
}