"use strict";

const express = require("express");
const ToolsService = require("../../services/tools/tools");

let router = express.Router();


router.post("/fetchTab", ToolsService.scrapeTabs);
router.post("/createBeat", ToolsService.createBeat);
router.get("/getBeatByUser/:userId", ToolsService.getBeatByUser);
router.post("/createEarTraining", ToolsService.createEarTraining);
router.post("/addEarTrainingToUser/:userId/:earTrainingId", ToolsService.addEarTrainingToUser);
router.put("/updateEarTrainingScoreForUser/:userId", ToolsService.updateEarTrainingScoreForUser);


module.exports = router;
