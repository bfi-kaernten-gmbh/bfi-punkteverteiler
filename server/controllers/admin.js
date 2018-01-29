const User = require('../models/user');
const { ObjectID } = require('mongodb');

const excluded = 'role password'

function returnDocs(users){
  res.send(users);
}

exports.getUsers = (req, res) => {
  // return all documents with role: user && only select properties in the
  // selectQuery variable
  User.find({role: 'user'})
    .exclude(excluded)
    .exec()
    .then((users) => {
      res.send(users);
    }).catch(e => {
      res.status(400).send(e);
    });
}

exports.getUser = (req, res) => {
  var { id } = req.params;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send({ error: 'user not found' })
  }

  User.findById(id)
    .exclude(excluded)
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

exports.updateUser = (req, res) => {
  res.send('hi');
}

exports.addPoints = (req, res) => {
  res.send('points');
}