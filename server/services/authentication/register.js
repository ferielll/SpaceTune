'use strict';

const User = require('../../models/User');

// Register new users
exports.registerUser=async(request, response)=> {
  let { email, password } = request.body;

  if (!email || !password) {
    response.json({
      success: false,
      message: 'Please enter email and password.'
    });
  } else {
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          response.json({
            success: false,
            message: 'User with that email already exist.',
          });
        } else {
          new User(request.body)
          .save()
          .then(doc => {
            if (doc) {
              response.json({
                success: true,
                message: 'Register user successfully.',
              });
            } else {
              response.json({
                success: false,
                message: 'Error registering user.',
              });
            }
          })
          .catch(error => {
            response.json(error);
          });
        }
      })
      .catch(error => {
        response.json(error);
      });
  }
}

// module.exports = {
//   registerUser: registerUser,
// };
