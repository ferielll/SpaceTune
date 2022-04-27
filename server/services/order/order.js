var Order = require("../../models/order");
var Users = require("../../models/User");
var passport = require("passport");
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51ITzQpDWjPU5uegJwMhDjZee2zrXPyMCTRlbEbLFll7yX13SInTSH2PK96oU3k4sIAojhFLv496LSBbORleThNR500f6QNoqIi');

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

  Order.find({}).populate("userID").populate("orderItems").exec((err, orders) => {
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






exports.pay = async (req, res) => {
  console.log("stripe-routes.js 9 | route reached", req.body);
  let { amount, id } = req.body;
  console.log("stripe-routes.js 10 | amount and id", amount, id);
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      description: "Your Company Description",
      payment_method: id,
      confirm: true,
    });
    console.log("stripe-routes.js 19 | payment", payment);
    res.json({
      message: "Payment Successful",
      success: true,
    });
  } catch (error) {
    console.log("stripe-routes.js 17 | error", error);
    res.json({
      message: "Payment Failed",
      success: false,
    });
  }
};

