"use strict";

const registerController = require("../../controllers/apis/register");
const loginController = require("../../controllers/apis/login");
const dashboardController = require("../../controllers/apis/dashboard");
const postController = require("../../controllers/apis/post");
const formationController = require("../../controllers/apis/formation")
const express = require("express");


let router = express.Router();

router.use("/register", registerController);
router.use("/login", loginController);
router.use("/dashboard", dashboardController);
router.use("/post", postController);
router.use("/formation", formationController);

module.exports = router;
