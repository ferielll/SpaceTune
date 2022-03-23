"use strict";

const express = require("express");
const FormationService = require("../../services/formation/formation");

let router = express.Router();

router.post("/create", FormationService.createFormation);
router.get("/getAll", FormationService.getAllFormations);
router.delete("/delete/:formationId", FormationService.deleteFormation);
router.get(
  "/findOne/:formationId",
  FormationService.getFormationsByFormationId
);
router.put("/subscribe/:formationId", FormationService.subscribeUsers);

module.exports = router;
