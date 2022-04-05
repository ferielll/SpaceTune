const mongoose = require('mongoose');

const EarTrainingSchema = new mongoose.Schema(
    {
    name:String,
    scale:String,
    chords:[String],
    perfectPitch:[String],
    level:String
    },
    {timestamps:true},{versionKey:false}
);


module.exports = mongoose.model('EarTraining', EarTrainingSchema);