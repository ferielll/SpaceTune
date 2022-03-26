var mongoose = require("mongoose");
var Users = require("./User");

const Item = mongoose.Schema({
  itemID: { type: mongoose.ObjectId, ref: "Item" },
  name: { type: String },
  price: { type: Number },
  orderQuantity: { type: Number },
});

var OrderSchema = mongoose.Schema(
  {
    userID: { type: mongoose.ObjectId, ref: "User" },
    orderBooks: { type: [Item] },
    totalMoney: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", OrderSchema);
