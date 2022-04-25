const mongoose = require('mongoose');



const PostSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum:["Video","Audio","Image"]
    },
    audio: String,
    video: String,
    Image: {
        type: String
    },
    username: {
        type: String,
        required: true,
      },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    dislikes : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
   comments : [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
},
{timestamps:true},{versionKey:false})
module.exports = mongoose.model('Post', PostSchema);