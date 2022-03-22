const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    channelName : String,
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    lastMessage : String,
    type: {
        type: String,
        enum:["Channel","Private"]
    },
},
{timestamps:true},{versionKey:false})
module.exports = mongoose.model('Conversation', ConversationSchema);