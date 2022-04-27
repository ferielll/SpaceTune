const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    members: { type: Array },
    lastMessage: {
      type: String,
      default: "start conversation",
    },
  },
  { timestamps: true },
  { versionKey: false }
);
module.exports = mongoose.model("Conversation", ConversationSchema);
