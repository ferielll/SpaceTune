const mongoose = require('mongoose');

const EarTrainingHistorySchema=new mongoose.Schema({
    earTraining:{type:mongoose.Schema.Types.ObjectId,ref:'EarTraining'},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    score:{type:Number,default:0},
    questions:{type:Number,default:0},
})

module.exports = mongoose.model('EarTrainingHistory', EarTrainingHistorySchema);