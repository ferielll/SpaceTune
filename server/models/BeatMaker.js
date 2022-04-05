const mongoose = require('mongoose');

const BeatMakerSchema = new mongoose.Schema(
    {
       beatList:[{
        calp:[Number],
        HiHatClosed:[Number],
        HiHatOpen:[Number],
        Kick:[Number],
        Snare1:[Number],
        Snare2:[Number],
        Bass:[Number],
        name:String,
        tempo:Number,
        
       }],
        user:{
            type:mongoose.Schema.Types.ObjectId, ref:'User'
        }
    },
    {timestamps:true},{versionKey:false}
);


module.exports = mongoose.model('BeatMaker', BeatMakerSchema);