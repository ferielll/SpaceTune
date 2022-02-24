const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    comment : String, 
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, {timestamps:true},{versionKey:false})


const PostSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum:["Video","Audio","Image"]
    },
    audio: String,
    video: String,
    photos: [String],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    dislikes : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
   comments :[CommentSchema],
},
{timestamps:true},{versionKey:false})
module.exports = mongoose.model('Post', PostSchema);