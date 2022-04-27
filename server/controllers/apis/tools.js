"use strict";

const express = require("express");
const ToolsService = require("../../services/tools/tools");

let router = express.Router();

router.post("/addEarTrainingHistory", ToolsService.addEarTrainingHistory);

router.post("/fetchTab", ToolsService.scrapeTabs);
router.post("/createBeat", ToolsService.createBeat);
router.get("/getBeatByUser/:userId", ToolsService.getBeatByUser);
router.get("/getEarTrainings", ToolsService.getEarTrainings);
router.delete("/deleteEarTraining/:id", ToolsService.deleteEarTraining);
router.post("/createEarTraining", ToolsService.createEarTraining);
router.post("/addEarTrainingToUser/:userId/:earTrainingId", ToolsService.addEarTrainingToUser);
router.put("/updateEarTrainingScoreForUser/:userId", ToolsService.updateEarTrainingScoreForUser);
router.delete("/deleteEarTrainingHistory/:id", ToolsService.deleteEarTrainingHistory);
router.get("/getEarTrainingHistory/:userId", ToolsService.getEarTrainingHistoryByUser);

module.exports = router;
