const mongoose = require('mongoose');

const answersSchema = new mongoose.Schema(
    {
        answers:[{
        answer:[],
        question:{type:mongoose.Schema.Types.ObjectId, ref:'Question'}
        }],
        quizId:{
            type:mongoose.Schema.Types.ObjectId, ref:'Quiz'
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId, ref:'User'
        }
    },
    {timestamps:true},{versionKey:false}
);


module.exports = mongoose.model('Answers', answersSchema);