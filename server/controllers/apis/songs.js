"use strict";


const express = require("express");
const SongsService = require("../../services/Tracks/Songs");
const validateObjectId  = require("../../services/Tracks/ValidateObjectId");

let router = express.Router();

router.post("/create" , SongsService.createSong);
router.get("/getAll", SongsService.getAllSongs);
router.put("/update/:songId" , SongsService.updateSong);
router.delete("/delete/:songId"  , SongsService.deleteSong);
router.put("/like/:id", SongsService.likeSong);
router.get("/like",SongsService.getLikedSongs);

module.exports = router;