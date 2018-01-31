const _ = require('lodash');
const { ObjectID } = require('mongodb');

const User = require('../models/user');

const excluded = '-role -password';
function removeWhitespace(el) {
  return el.replace(/\s/g, '');
}


exports.getUsers = (req, res) => {
  // return all documents with role: user && only select properties in the
  // selectQuery variable
  User.find({role: 'user'})
    .select(excluded)
    .exec()
    .then((users) => {
      res.send(users);
    }).catch(e => {
      res.status(400).send(e);
    });
}

exports.getUser = (req, res) => {
  var { id } = req.params;

  User.findById(id)
    .select(excluded)
    .exec()
    .then(user => {
      if(!user) {
        return res.status(404).send({ error: 'user not found' })
      }
      res.send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    })
}

exports.addPoints = (req, res) => {
  const ids = removeWhitespace(req.body.ids).split(',');
  const {addPoints} = _.pick(req.body, ['addPoints']);
  
  for (var i = 0; i < ids.length; i++) {
    if (!ObjectID.isValid(ids[i])){
      return res.status(404).send({error: 'One of the Id`s was not valid'});
    }
  }

  User.update({_id: {$in: ids}},{$inc: {totalPoints: addPoints }, $push: {pointLog: {points: addPoints}}}, { multi: true }).then((docs) => {
    res.send(docs);
  }).catch(e => res.send(e))
}

exports.removeUser = (req, res) => {
  const { id } = req.params;

  User.findByIdAndRemove(id).then((user) => {
    if (!user) {
      return res.status(404).send({error: 'User not found!'});
    }
    const {username, email} = user;
    res.send({ user: {username, email}});
  }).catch(e => res.send(e));
}
