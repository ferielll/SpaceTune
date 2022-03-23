'use strict';

const express = require('express');
const PostService = require('../../services/post/post');
const multer = require('multer');

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
  });

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });

let router = express.Router();

router.post('/create', upload.single('Image'),PostService.createPost);
router.put('/update/:postId', PostService.updatePost);
router.get('/getAll', PostService.getAllPosts);
router.delete('/delete/:postId', PostService.deletePost);
router.get('/findOne/:userId', PostService.getPostsByUserId);

module.exports = router;