"use strict";

const registerController = require("../../controllers/apis/register");
const loginController = require("../../controllers/apis/login");
const dashboardController = require("../../controllers/apis/dashboard");
const postController = require("../../controllers/apis/post");
const toolsController = require("../../controllers/apis/tools");
const formationController = require("../../controllers/apis/formation");
const shopController = require("../../controllers/apis/shop");
const orderController = require("../../controllers/apis/order");
const messageController = require("../../controllers/apis/message");
const conversationController = require("../../controllers/apis/conversation");
const surveyController = require("../../controllers/apis/survey");
const commentController = require("../../controllers/apis/comment")
const songController = require("../../controllers/apis/songs")
const trackController = require("../../controllers/apis/track")
const userController=require("../../controllers/apis/user")
const express = require("express");
const playlistController = require("../../controllers/apis/playlist");
const search = require("../../services/Tracks/search");

let router = express.Router();

router.use("/register", registerController);
router.use("/login", loginController);
router.use("/dashboard", dashboardController);
router.use("/chat/message", messageController);
router.use("/chat/conversation", conversationController);
router.use("/survey", surveyController);
router.use("/post", postController);
router.use("/formation", formationController);
router.use("/shop", shopController);
router.use("/tools", toolsController);
router.use("/order", orderController);
router.use("/comment", commentController);
router.use("/song", songController);
router.use("/playlist", playlistController);
router.use("/search", search);
router.use("/track", trackController);
router.use("/user", userController);

module.exports = router;
