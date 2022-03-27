const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: String,
    photos: String,
    isUsed: Boolean,
    description: String,
    price: {
        type: Number,
        required:true,
    },
    inStock: {
        type: Boolean,
        default:true,
    },
    qte : Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})
module.exports = mongoose.model('Item', ItemSchema);