"use strict";
const Message = require("../../models/Message");
const Conversation = require("../../models/Conversation");

exports.createMessage = async (req, res) => {
  const newMessage = new Message(req.body);
  console.log(req.body.text);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
    const filter = { _id: savedMessage.conversationId };
    const update = { lastMessage: req.body.text };
    await Conversation.findOneAndUpdate(filter, update);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getMessage = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    }).populate("sender");
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};
