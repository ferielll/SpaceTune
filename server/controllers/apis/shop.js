"use strict";

const express = require("express");
const ItemService = require("../../services/item/item");
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
      cb(null, './uploadsShop/');
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

router.post('/create', upload.single('photos'),ItemService.createItem);
router.put('/update/:itemId', ItemService.updateItem);
router.get('/getAll', ItemService.getAllItems);
router.get('/getUsedItems', ItemService.getUsedItems);
router.get('/getNewItems', ItemService.getNewItems);
router.delete('/delete/:itemId', ItemService.deleteItem);
router.get('/findOne/:userId', ItemService.getItemsByUserId);

module.exports = router;
