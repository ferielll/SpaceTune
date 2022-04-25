"use strict";

const express = require("express");
const OrderService = require("../../services/order/order");

let router = express.Router();

router.post('/create', OrderService.createOrder);

router.get('/getAll', OrderService.showAllOrders);
router.delete('/delete/:orderId', OrderService.deleteOrder);


module.exports = router;