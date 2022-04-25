"use strict";
const Conversation = require("../../models/Conversation");
const User = require("../../models/User");

//new conv
exports.createConversation = async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get conv of a user
exports.getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get conv includes two userId
exports.getConversationOftwoUsers = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

//find user by id
exports.getUserById = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (err) {}
};
