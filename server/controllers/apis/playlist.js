"use strict";

const express = require("express");
const PlaylistService = require("../../services/Tracks/Playlist");
const auth = require("../../services/Tracks/auth")

let router = express.Router();

router.post("/create" ,PlaylistService.createplaylist);
router.put("/update/:id", PlaylistService.updateplaylist);
router.put("/add-song", PlaylistService.addsong);
router.put("/remove-song", PlaylistService.removesong);
router.get("/favourite",PlaylistService.userplaylist);
router.get("/random", PlaylistService.randomplaylist);
router.get("/:id" , PlaylistService.playlistbyid);
router.get("/getAll", PlaylistService.getall);
router.delete("/delete/:id",PlaylistService.deleteplaylistbyid);

module.exports = router;