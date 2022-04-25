"use strict";

const express = require("express");
const ConversationService = require("../../services/chat/ConversationService");
let router = express.Router();

router.post("/", ConversationService.createConversation);
router.get("/:userId", ConversationService.getConversation);
router.get(
  "/find/:firstUserId/:secondUserId",
  ConversationService.getConversationOftwoUsers
);

router.get("/users/:userId",ConversationService.getUserById);

module.exports = router;
