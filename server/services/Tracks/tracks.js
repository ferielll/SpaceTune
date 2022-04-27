"use strict";

const track = require("../../models/tracks");
const User = require("../../models/User");
const mongoose = require("mongoose");
const youtube = require("scrape-youtube")

exports.createTrack = async (request, response) => {
  new track({
    user: request.body.user,
    name: request.body.name,
    song: request.file.path,
  })
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

exports.getTracksByUserId = async (request, response) => {
  track
    .find({ user: request.params.userId })
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
exports.getRandomTracks = async (request, response) => {
  track
    .find()
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
exports.getTrackById = async (request, response) => {
  let Track;
  try {
    Track = await track.findById(request.params.trackId).populate("likes");
    response.status(200).json(Track);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

exports.deleteTrack = async (request, response) => {
  try {
    await track.findOneAndDelete({ _id: request.params.trackId });
    console.log("feriel");
    response.send({ success: true, message: "track deleted successfuly" });
  } catch (error) {
    response.json({ success: false, message: error });
  }
};

//like track
exports.trackLike = async (req, res) => {
  try {
    //find track to update its likes
    const Track = await track.findById(req.params.id);
    //check if track likes include this user
    if (!Track.likes.includes(req.body.id)) {
      await Track.updateOne({ $push: { likes: req.body.id } });
      res.status(200).send("Like track");
    } else {
      await Track.updateOne({ $pull: { likes: req.body.id } });
      res.status(200).send("Dislike track");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

//list of tracks likes by userID
exports.favorites = async (req, res) => {
  try {
    const Track = await track.find({likes:req.params.id});
    return res.send(Track)
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
exports.scrapeVideo=async (req,res)=>{
  let search=req.body.name+" karaoke"
  
  youtube.search(search).then((results) => {
    // Unless you specify a custom type you will only receive 'video' results
    return res.send(results.videos[0])
  });
}