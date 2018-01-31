const _ = require('lodash');

const User = require('../models/user');
const { ObjectID } = require('mongodb');

const excluded = '-role -password'

function returnDocs(users){
  res.send(users);
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

exports.addPoints = (req, res) => {
  const ids = req.body.ids.split(',');
  console.log(ids);
  const body = _.pick(req.body, ['addPoints'])
  console.log(body);

  User.update({ids},{$inc: {totalPoints: body.addPoints}}, { multi: true }).then((doc) => {
    if(!doc) {
      res.status.send({error: 'Users not found'})
    }
    res.send(doc.totalPoints);
  }).catch(e => send(e))
}

exports.removeUser = (req, res) => {
  const { id } = req.params;

  User.findByIdAndRemove(id).then((user) => {
    if (!user) {
      res.status(404).send({error: 'User not found!'});
    }
    res.send({user});
  }).catch(e => res.send(e));
}
