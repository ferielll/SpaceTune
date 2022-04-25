const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema(
  {
    quizName: {
      type: String,
    },
    quizDescription: {
      type: String,
    },
    quizQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
  { versionKey: false }
);

module.exports = mongoose.model("Quiz", QuizSchema);
