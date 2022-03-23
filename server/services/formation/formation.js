"use strict";

const Formation = require("../../models/Formation");
exports.createFormation = async (request, response) => {
  new Formation(request.body)
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

// exports.updateFormation = async (request, response) => {
//   try {
//     await Formation.findOneAndUpdate(
//       { _id: request.params.formationtId },
//       request.body
//     );
//     response.send({ success: true });
//   } catch (error) {
//     response.json({ success: false, message: error });
//   }
// };

exports.getAllFormations = async (request, response) => {
  try {
    let formations = await Formation.find()
      .select(" -users")
      .populate("teacher");
    response.send(formations);
  } catch (error) {
    response.json({ success: false, message: error });
  }
};

exports.deleteFormation = async (req, res) => {
  try {
    await Formation.findOneAndDelete({ _id: req.params.formationtId });
    console.log("formation", req.params.formationId);
    res.send({ success: true, message: "Formation deleted succesfully" });
  } catch (error) {
    res.json({ success: false, message: error });
  }
};

exports.getFormationsByFormationId = async (request, response) => {
  try {
    let formation = await Formation.findOne({
      _id: request.params.formationId,
    }).populate("users teacher");
    response.send(formation);
  } catch (error) {
    response.json({ success: false, message: error });
  }
};

exports.subscribeUsers = async (req, res) => {
  try {
    Formation.findOneAndUpdate(
      {
        _id: req.params.formationId,
      },
      {
        $set: {
          users: req.body._id,
        },
      }
    );
    res.send({ success: true });
  } catch (error) {
    res.json({ success: false });
  }
  // Formation.update(
  //   {
  //     _id: req.params.formationId,
  //   },
  //   {
  //     $set: {
  //       users: req.body._id,
  //     },
  //   },
  //   function (err, formation) {
  //     if (err) throw err;
  //     console.log("err");
  //     console.log("update formation complete");
  //   }
  // );
};
