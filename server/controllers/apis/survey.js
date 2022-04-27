"use strict";

const express = require("express");
//services
const AnswerService = require("../../services/survey/AnswerService");
const PreviewService = require("../../services/survey/PreviewService");
const SurveyService = require("../../services/survey/SurveyService");
const verifyToken = require("../../middleware/authentification");

let router = express.Router();
//survey
router.post("/create/:formationId", verifyToken, SurveyService.store);
router.get("/listSurveys/:formationId", verifyToken, SurveyService.FindQuiz);
router.get("/allSurveys", SurveyService.FindAllQuizs);
router.get("/detailSurvey/:id", SurveyService.QuizDetails);
router.put("/updateSurvey/:id", verifyToken, SurveyService.UpdateQuiz);
router.delete("/deletesurvey/:id", SurveyService.destroy);
//answer
router.post("/answer/", verifyToken, AnswerService.store);
//preview
router.get("/viewStat/:id", PreviewService.Find);

module.exports = router;
