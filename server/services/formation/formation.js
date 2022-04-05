"use strict";

const Formation = require("../../models/Formation");
exports.createFormation = async (req, res) => {
  new Formation(req.body)
    .save()
    .then((doc) => {
      if (doc) {
        res.json({
          success: true,
          content: doc,
        });
      } else {
        res.json({
          success: false,
        });
      }
    })
    .catch((error) => {
      res.json(error);
    });
};

exports.updateFormation = async (request, response) => {
  try {
    await Formation.findByIdAndUpdate(
      { _id: request.params.formationtId },
      request.body
    );
    response.send({ success: true });
  } catch (error) {
    response.json({ success: false, message: error });
  }
};

exports.getAllFormations = async (req, res) => {
  const pagination = JSON.parse(
    req.query.pagination ? req.query.pagination : "{}"
  );
  const { page = 1, limit = 8 } = pagination;
  const sort = JSON.parse(req.query.sort ? req.query.sort : 1);
  let totalDocs = await Formation.countDocuments();
  Formation.find()
    .sort({ name: sort })
    .skip(limit * (page - 1))
    .limit(limit)
    .select()
    .populate("teacher")
    .then((formations) => {
      let totalPagesFloat = totalDocs / limit;
      let totalPagesInt = parseInt(totalDocs / limit);
      if (totalPagesFloat > totalPagesInt) totalPagesInt++;
      let nextPage = totalPagesInt > page ? page + 1 : null;
      let hasNextPage = !!nextPage;
      let prevPage = page === 1 ? null : page - 1;
      let hasPrevPage = !!prevPage;
      let result = {
        docs: formations,
        totalDocs: totalDocs,
        limit,
        page,
        totalPages: totalPagesInt,
        hasNextPage,
        nextPage,
        hasPrevPage,
        prevPage,
      };
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes.",
      });
    });
};

exports.deleteFormation = async (req, res) => {
  try {
    console.log("fo", req.params.formationId);
    await Formation.deleteOne({ _id: req.params.formationId });
    res.send({ success: true, message: "Formation deleted succesfully" });
  } catch (error) {
    res.json({ success: false, message: error });
  }
};

exports.getFormationsByFormationId = async (request, response) => {
  try {
    let formation = await Formation.findOne({
      _id: request.params.formationId,
    }).populate("teacher");
    response.send(formation);
  } catch (error) {
    response.json({ success: false, message: error });
  }
};

exports.getMyLessons = async (request, response) => {
  try {
    let formation = await Formation.find({
      teacher: request.params.teacherId,
    }).populate("teacher");
    response.send(formation);
  } catch (error) {
    response.json({ success: false, message: error });
  }
};

exports.getMyLessonByFormationId = async (request, response) => {
  try {
    let formation = await Formation.findOne({
      _id: request.params.trainingId,
    }).populate("teacher users");
    response.send(formation);
  } catch (error) {
    response.json({ success: false, message: error });
  }
};

exports.subscribeUsers = async (req, res) => {
  try {
    await Formation.findByIdAndUpdate(
      {
        _id: req.params.formationId,
      },
      {
        $push: {
          users: req.body,
        },
      }
    );
    res.send({ success: true });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

exports.addOnlineLessons = async (req, res) => {
  try {
    await Formation.findByIdAndUpdate(
      {
        _id: req.params.formationId,
      },
      {
        $push: { onlineLessons: req.body },
      }
    );
    res.send({ success: true });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
