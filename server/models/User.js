const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const UserSchema = new mongoose.Schema({
  userName:{
    type:String,
    unique:true,
    required:true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  avatar:{
    type:String,
    default:""
  },
  phone:{
    type:Number
  },
  birthday:{
    type:Date
  },
  password: {
    type: String,
    required: true
  },
  instruments:[{
    name:{type:String,
    enum:["guitar","ukulele","piano","chello"]
    },
    level:Number
  }],
  role: {
    type: String,
    enum: ['SUPERADMIN', 'SIMPLEUSER','PROFESSOR'],
    default: 'SIMPLEUSER'
  },
  tag:{
     name:{
       type:String,
       enum: ['bronze', 'silver','gold','diamond','superstar']
     },
     points:{
       type:Number,
       default:0
     }
  }
});

UserSchema.pre('save', function(next) {
  let user = this;

  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.log(err);
        return next(err);
      }

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          console.log(err);
          return next(err);
        }

        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// Create method to compare password input to password saved in database
UserSchema.methods.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }

    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
