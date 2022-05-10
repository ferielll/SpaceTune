"use strict";

const mongoose = require("mongoose");
const User=require("../../models/User");

exports.getUserById=async(request, response)=>{
    User.findById(request.params.userId)  
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
}
