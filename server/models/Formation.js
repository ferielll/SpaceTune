const mongoose = require("mongoose");

const FormationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: String,
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    description: String,
    price: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
    },
    onlineLessons: [
      {
        date: Date,
        description: String,
        name: String,
      },
    ],
  },
  { timestamps: true },
  { versionKey: false }
);
module.exports = mongoose.model("Formation", FormationSchema);
