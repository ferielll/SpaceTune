const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
    {
        question:{
            type:String
        },
        typeQuestion:{
            type:String
        },
        choices:[{type:String}],
        
    },
    {timestamps:true},{versionKey:false}
);


module.exports = mongoose.model('Question', questionSchema);