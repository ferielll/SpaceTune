"use strict";
const { forEach } = require("lodash");
const Conversation = require("../../models/Conversation");
const Formation = require("../../models/Formation");
//create training

exports.createFormation = async (req, res) => {
  const {
    name,
    teacher,
    users,
    description,
    price,
    type,
    onlineLessons,
    image,
  } = req.body;
  new Formation({
    name,
    teacher,
    users,
    description,
    price,
    type,
    onlineLessons,
    image: [{ imageURL: req.file.path }],
  })
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

//update training

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

// fetch all trainings
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
    .populate("teacher courses")
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
        message:
          err.message || "Some error occurred while retrieving formation.",
      });
    });
};

//delete training

exports.deleteFormation = async (req, res) => {
  try {
    console.log("fo", req.params.formationId);
    await Formation.deleteOne({ _id: req.params.formationId });
    res.send({ success: true, message: "Formation deleted succesfully" });
  } catch (error) {
    res.json({ success: false, message: error });
  }
};

//fetch selected formation (by id)
exports.getFormationsByFormationId = async (request, response) => {
  try {
    let formation = await Formation.findOne({
      _id: request.params.formationId,
    }).populate("teacher courses users");
    response.send(formation);
  } catch (error) {
    response.json({ success: false, message: error });
  }
};

//subscribe on training
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
    const newConversation = new Conversation({
      members: [req.body._id, req.params.receiverId],
    });
    await newConversation.save();
    res.send({ success: true });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// add online lessons
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

//fetch lessons
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

//fetch all onlinlessons
exports.getAllOnlineLessons = async (request, response) => {
  try {
    let formation = await Formation.find({
      teacher: request.params.teacherId,
    }).select("onlineLessons -_id");
    let data = [];
    formation.forEach((element) => {
      if (element.onlineLessons.length !== 0) {
        element.onlineLessons.forEach((d) => {
          data.push(d);
        });
      }
    });
    response.send(data);
  } catch (error) {
    response.json({ success: false, message: error });
  }
};

//fetch lessons only for selected training
exports.getMyLessonByFormationId = async (request, response) => {
  try {
    let formation = await Formation.findOne({
      _id: request.params.trainingId,
    }).populate("teacher users courses");
    response.send(formation);
  } catch (error) {
    response.json({ success: false, message: error });
  }
};
