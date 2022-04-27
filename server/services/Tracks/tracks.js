"use strict";



const track = require('../../models/tracks');
const User=require("../../models/User");
const mongoose = require("mongoose");


exports.createTrack=async(request, response)=>{

    new track(
    {  user: request.body.user,
    name:request.body.name,
    song:request.file.path,
  }
    )
    .save()
    .then((doc) => {
      if (doc) {
        response.json({
          success: true,
          content: doc,
        });
      } else {
        response.json({
          success: false,
        });
      }
    })
    .catch((error) => {
      response.json(error);
    });
};

exports.getTracksByUserId=async(request, response)=>{
    track.find({user:request.params.userId})
    .then((doc) => {
      if (doc) {
        response.json({
          success: true,
          content: doc,
        });
      } else {
        response.json({
          success: false,
        });
      }
    })
    .catch((error) => {
      response.json(error);
    });
}
exports.getRandomTracks=async (request,response)=>{
  track.find()
    .then((doc) => {
      if (doc) {
        response.json({
          success: true,
          content: doc,
        });
      } else {
        response.json({
          success: false,
        });
      }
    })
    .catch((error) => {
      response.json(error);
    });

}
exports.getTrackById=async (request,response)=>{
  try {
    let track = await track.findById(request.params.trackId)
    response.status(200).json(track)
} catch(error){
    response.status(500).json(error);
}
}

exports.deleteTrack=async(request,response)=>{
  try {
    await track.findOneAndDelete({_id:request.params.trackId})
    console.log("feriel")
    response.send({success:true,message: "track deleted successfuly"})
}
catch(error) {
    response.json({success:false , message: error});
}
}