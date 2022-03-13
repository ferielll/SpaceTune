const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    content: String,
    type: {
        type: String,
        enum:["Video","Audio","Image","PDF"]
    },  
},
{timestamps:true},{versionKey:false})
module.exports = mongoose.model('Message', MessageSchema);