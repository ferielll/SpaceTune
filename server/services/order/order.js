var Order = require("../../models/order");
var Users = require("../../models/User");
var passport = require("passport");

const mongoose = require("mongoose");

exports.createOrder=async(request, response)=>{
 
    new Order({
        _id: new mongoose.Types.ObjectId(),
        userID: request.body.order.userID,
        itemOrders: request.body.order.items,
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

  Order.find({}).populate("userID").populate("itemOrders").exec((err, orders) => {
    if (err) {
      next(err);
    }
    res.json(orders);
  });
};


exports.deleteOrder=async (request,response)=>{
  // try{
  //     await Order.findOneAndDelete({_id:request.params.orderId})
  //     response.send({success:true,message:"order delete succesfully"})
  // }
  // catch(error){
  //     response.json({success:false,message:error});

  // }
  try {
      
        try {
          await Order.findOneAndDelete({_id:request.params.orderId});
          response.status(200).json("Order has been deleted...");
        } catch (err) {
          response.status(500).json(err);
        }
      
    } catch (err) {
      response.status(500).json(err);
    }
}
