const { ObjectID } = require('mongodb');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const config = require('../config.js');

exports.id = (req, res, next) => {
  const id = req.params.id || req.body.id;
  if(!ObjectID.isValid(id)) {
    res.status(404).send({error: 'id invalid'});
    return next('id invalid');
  }
  next();
}

exports.role = function(roles) {
  return function (req, res, next) {
    var { user } = req;

    User.findById(user._id).then((foundUser) => {
      if(roles.indexOf(foundUser.role) > -1){
        return next();
      }
      res.status(401).send({error: 'You are not authorized to view this content'});
      return next('Unauthorized');
    }, (e) => {
      res.status(422).send({error: 'No user found.'});
      return next(e);
    })
  }
}

exports.password = (req, res, next) => {
  const { password } = req.body;
  const { username } = req.user;
  User.findOne({username}).then((user) => {
    user.comparePassword(password, function (err, isMatch) {
      if(!isMatch) {
        res.status(400).send('password doesnt match');
        return next('password doesnt match');
      }
      next();
    })
  })
}

exports.hashPassword = (req, res, next) => {
  const { newPassword } = req.body;
  bcrypt.genSalt(10, function (err, salt) {
    if(err) {
      next(err);
    }
    bcrypt.hash(newPassword, salt, function (err, hash) {
      if(err) {
        next(err);
      }
      req.hashedPassword = hash;
      next();
    })
  })
}

exports.token = (req, res, next) => {
  let { token } = req.body;
  token = jwt.decode(token, config.secret);
  console.log(token.exp > new Date().getTime());
  if(token.exp < new Date().getTime()) {
    res.status(400).send('Your Link is alreay expired');
    next('Your Link is alreay expired');
  }
  req._id = token.sub;
  next();
}
