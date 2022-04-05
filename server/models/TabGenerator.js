const mongoose = require('mongoose');

const TabGenerator = new mongoose.Schema(
    {name:String,
    photo:String,
    })

    module.exports = mongoose.model('tabGenerator', TabGenerator);