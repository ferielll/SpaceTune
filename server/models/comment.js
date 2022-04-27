const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    comment : String,
    postowner: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    responseTo : { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, {timestamps:true},{versionKey:false})


module.exports = mongoose.model('Comment' , CommentSchema);