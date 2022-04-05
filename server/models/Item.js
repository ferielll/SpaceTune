const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: String,
    photos: String,
    isUsed:{
        type: Boolean,
        default:false},
    description: String,
    price: {
        type: Number,
        default: 0,
    },
    inStock: {
        type: Boolean,
        default:true,
    },
    
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})
module.exports = mongoose.model('Item', ItemSchema);