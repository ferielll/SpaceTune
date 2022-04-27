const Quiz = require("../../models/Quiz");
const Question = require("../../models/Question");

//----- Add quiz -----
exports.store = async (req, res) => {
  try {
    // create the questions
    let quizQuestions = req.body.quizQuestions.map((question) => {
      return new Question({
        question: question.question,
        typeQuestion: question.typeQuestion,
        choices: question.choices,
      });
    });

    // save the questions in Question|  *insertMany() inserts each element in the array into the collection*
    const questionsSaved = await Question.insertMany(quizQuestions);

    // get ids questions from questionsSaved
    let idQuestions = questionsSaved.map((one) => {
      return one._id;
    });

    // save quiz
    const quiz = new Quiz({
      userId: req.user,
      quizName: req.body.quizName,
      quizDescription: req.body.quizDescription,
      quizQuestions: idQuestions,
    });
    let savedquiz = await quiz.save();
    res.send(savedquiz);
  } catch (err) {
    console.log(err, "error");
    res.status(400).send(err);
  }
};

//----- Find List quizs of UserConnected (name & description) -----
exports.FindQuiz = async (req, res) => {
  try {
    const listquiz = await Quiz.find({ userId: req.user }).select(
      "_id quizName quizDescription"
    );
    res.json(listquiz);
  } catch (err) {
    res.json({ message: "empty list" });
  }
};

//----- Find All quizs -----
exports.FindAllQuizs = async (req, res) => {
  try {
    const Allquiz = await Quiz.find().select("_id quizName quizDescription");
    res.json(Allquiz);
  } catch (err) {
    res.json({ message: "empty list" });
  }
};

//----- Get quiz détails -----
exports.QuizDetails = async (req, res) => {
  try {
    const details = await Quiz.findById(req.params.id)
      .populate("quizQuestions")
      .select(" -createdAt -updatedAt");
    res.json(details);
  } catch (err) {
    res.json({ message: "empty list" });
  }
};

//----- Edit quiz -----
exports.UpdateQuiz = async (req, res) => {
  try {
    //get the target quiz
    let target = await Quiz.findById(req.params.id);
    //delete questions in Question
    await Question.deleteMany({ _id: { $in: target.quizQuestions } });
    // create the new questions
    let quizQuestions = req.body.quizQuestions.map((question) => {
      return new Question({
        question: question.question,
        typeQuestion: question.typeQuestion,
        choices: question.choices,
      });
    });
    // save the questions in Question
    const questionsSaved = await Question.insertMany(quizQuestions);

    // get the new ids questions from questionSaved
    let idQuestions = questionsSaved.map((one) => {
      return one._id;
    });

    // update quiz
    const quiz = {
      quizName: req.body.quizName,
      quizDescription: req.body.quizDescription,
      quizQuestions: idQuestions,
      userId: req.params.userId,
    };
    // save quiz in quiz
    let updatedquiz = await Quiz.findByIdAndUpdate(req.params.id, {
      $set: quiz,
    });
    res.send(updatedquiz);
  } catch (err) {
    res.status(400).send(err);
  }
};

//-----Delete user----
exports.destroy = async (req, res) => {
  try {
    //get the target quiz
    let target = await Quiz.findById(req.params.id);
    //delete questions in Question
    await Question.deleteMany({ _id: { $in: target.quizQuestions } });
    //delete quiz
    await Quiz.findByIdAndDelete(req.params.id);
    res.json({ message: "quiz deleted successfully" });
  } catch (err) {
    res.json({ message: "An error occured" });
  }
};
