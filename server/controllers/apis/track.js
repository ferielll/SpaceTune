"use strict";

const express = require("express");
const tracksService = require("../../services/Tracks/tracks");
const multer = require("multer");
let router = express.Router();

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});
router.post("/addTrack", upload.single("song"), tracksService.createTrack);
router.get("/getRandomTracks", tracksService.getRandomTracks);
router.get("/getTracksByUserId/:userId", tracksService.getTracksByUserId);
router.get("/getTrackById/:trackId", tracksService.getTrackById);
router.delete("/deleteTrackById/:trackId", tracksService.deleteTrack);
router.put("/like/:id", tracksService.trackLike);
router.get("/favorites/:id", tracksService.favorites);
router.post("/getvideo",tracksService.scrapeVideo)
module.exports = router;
