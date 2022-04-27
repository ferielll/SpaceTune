const Answer = require("../../models/Answers");

//----- Add Survey -----
exports.store = async (req, res) => {
  try {
    // save survey
    const setAnswers = new Answer({
      answers: req.body.answers,
      quizId: req.body.quizId,
      userId: req.body.userId,
    });
    let show = await setAnswers.save();
    res.send(show);
  } catch (err) {
    console.log(err, "err");
    res.status(400).send(err);
  }
};
