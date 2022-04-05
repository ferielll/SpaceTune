"use strict";

const express = require("express");
const ToolsService = require("../../services/tools/tools");

let router = express.Router();


router.post("/fetchTab", ToolsService.scrapeTabs);


module.exports = router;
