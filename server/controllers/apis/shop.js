"use strict";

const express = require("express");
const ItemService = require("../../services/item/item");

let router = express.Router();

router.post('/create', ItemService.createItem);
router.put('/update/:itemId', ItemService.updateItem);
router.get('/getAll', ItemService.getAllItems);
router.get('/getUsedItems', ItemService.getUsedItems);
router.get('/getNewItems', ItemService.getNewItems);
router.delete('/delete/:itemId', ItemService.deleteItem);
router.get('/findOne/:userId', ItemService.getItemsByUserId);

module.exports = router;
