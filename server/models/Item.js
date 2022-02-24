const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum:["guitar","ukulele","piano","chello", "accesories"]
    },
    photos: String,
    isUsed: Boolean,
    description: String,
    price: {
        type: Number,
        required:true,
    },
    inStock: Boolean,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})
module.exports = mongoose.model('Item', ItemSchema);