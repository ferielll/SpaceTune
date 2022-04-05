var Order = require("../../models/order");
var Users = require("../../models/User");
var passport = require("passport");

const mongoose = require("mongoose");

exports.createOrder=async(request, response)=>{
 
    new Order({
        _id: new mongoose.Types.ObjectId(),
        userID: request.body.order.userID,
        orderItems: request.body.order.items,
        totalMoney: request.body.order.total,
      
       
    })
    .save()
    .then((doc) => {
      if (doc) {
        response.json({
          success: true,
          content: doc,
        });
      } else {
        response.json({
          success: false,
        });
      }
    })
    .catch((error) => {
      response.json(error);
    });
};



exports.showAllOrders = function (req, res, next) {
  // Orders.find({}, (err, orders) => {
  //   if (err) {
  //     next(err);
  //   }
  //   Orders.populate(orders, {path: "userID", select: "name"});
  //   res.json(orders);
  // });

  Order.find({}).populate("userID").exec((err, orders) => {
    if (err) {
      next(err);
    }
    res.json(orders);
  });
};
