const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  photo: { type: String },
  name: { type: String },
  song: { type: String },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("track", trackSchema);
