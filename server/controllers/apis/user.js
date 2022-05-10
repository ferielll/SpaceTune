"use strict";

const express = require("express");
const UserService = require("../../services/user/user");

let router = express.Router();

router.get(
  "/:userId",
  UserService.getUserById
);
module.exports = router;
