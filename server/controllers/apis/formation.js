"use strict";

const express = require("express");
const FormationService = require("../../services/formation/formation");
const parser = require("../../middleware/cloudinary.config");

let router = express.Router();

router.post(
  "/create",
  parser.single("image"),
  FormationService.createFormation
);
router.get("/getAll", FormationService.getAllFormations);
router.put("/update/:formationtId", FormationService.updateFormation);
router.get("/myLessons/:teacherId", FormationService.getMyLessons);
router.get(
  "/myLessonById/:trainingId",
  FormationService.getMyLessonByFormationId
);
router.delete("/delete/:formationId", FormationService.deleteFormation);
router.get(
  "/findOne/:formationId",
  FormationService.getFormationsByFormationId
);
router.put("/subscribe/:formationId", FormationService.subscribeUsers);
router.put("/addOnlineLesson/:formationId", FormationService.addOnlineLessons);

//fetch lessons only for selected training
router.get("/getAllOnlineLessons/:teacherId", FormationService.getAllOnlineLessons);


module.exports = router;
