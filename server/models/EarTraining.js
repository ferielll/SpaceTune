const mongoose = require('mongoose');

const EarTrainingSchema = new mongoose.Schema(
    {
    name:String,
    scale:Number,
    chords:Number,
    perfectPitch:Number,
    level:String
    },
    {timestamps:true},{versionKey:false}
);


module.exports = mongoose.model('EarTraining', EarTrainingSchema);