'use strict';

const express = require('express');
const PostService = require('../../services/post/post');

let router = express.Router();

router.post('/create', PostService.createPost);
router.put('/update/:postId', PostService.updatePost);
router.get('/getAll', PostService.getAllPosts);
router.delete('/delete/:postId', PostService.deletePost);
router.get('/findOne/:formationId', PostService.getPostsByUserId);

module.exports = router;