const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const pointLogSchema = new Schema({
  points: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String
  }
})

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  pointLog: [pointLogSchema]
})

// On Save Hook, encrypt password
// "pre" -> Before saving a model, run this function
userSchema.pre('save', function (next) {
  // get access to the user model
  const user = this;
  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if(err) {
      return next(err);
    }

    // has (encrypt) the password using salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if(err) {return next(err);}

      // overwrite plain text password with encrypted password
      user.password = hash;
      next();
    })
  })
})

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if(err) { return callback(err); }

    callback(null, isMatch);
  })
}

const User = mongoose.model('User', userSchema);


module.exports = User;
