"use strict";

const express = require("express");
const CommentService = require("../../services/post/comment");

let router = express.Router();

router.post("/create", CommentService.createComment);
router.put("/update/:commentId", CommentService.updateComment);
router.get("/getAll" , CommentService.getAllComments);
router.delete("/delete/:commentId" , CommentService.deleteComment);
router.get("/get/:commentId" , CommentService.getCommentById);
router.get("/getPost/:postId" , CommentService.getCommentByPostId);
router.get("/findUser/:userId" , CommentService.getCommentByUserId);

module.exports = router;