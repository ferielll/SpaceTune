"use strict";

const express = require("express");
const MessageService = require("../../services/chat/MessageService");
let router = express.Router();

router.post("/", MessageService.createMessage);
//get all messages for 1 conversation
router.get("/:conversationId", MessageService.getMessage);

module.exports = router;
