const {ObjectID} = require('mongodb');
const User = require('../models/user');

exports.id = (req, res, next) => {
  if(!ObjectID.isValid(req.params.id)) {
    res.status(404).send({error: 'User not found - id invalid'});
    return next('User not found - id invalid');
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
