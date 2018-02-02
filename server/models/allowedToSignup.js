const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const allowedToSignupSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  }
})

const allowedToSignup = mongoose.model('allowedtosignup', allowedToSignupSchema);

module.exports = allowedToSignup;
