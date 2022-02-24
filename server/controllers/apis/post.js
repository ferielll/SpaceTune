'use strict';

const express = require('express');
const PostService = require('../../services/post/post');

let router = express.Router();

router.post('/create', PostService.createPost);
router.put('/update/:postId', PostService.updatePost);
router.get('/getAll', PostService.getAllPosts);
router.delete('/delete/:postId', PostService.getAllPosts);
router.get('/findOne/:userId', PostService.getPostsByUserId);

module.exports = router;