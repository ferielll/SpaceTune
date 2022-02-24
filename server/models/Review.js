const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item'},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    formation: { type: mongoose.Schema.Types.ObjectId, ref: 'Formation'},
    description: String,
    rating: {
        type: Number,
        
    },
    
},
{timestamps:true},{versionKey:false})
module.exports = mongoose.model('Review', ReviewSchema);