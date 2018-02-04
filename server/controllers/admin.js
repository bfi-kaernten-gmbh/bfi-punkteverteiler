const _ = require('lodash');
const { ObjectID } = require('mongodb');

const User = require('../models/user');
const allowedToSignup = require('../models/allowedToSignup');

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
  let { ids, description, addPoints } = req.body;

  if (!Array.isArray(ids)) {
    return res.status(500).send({error: 'Internal Server Booboo (ids is not an array)'});
  }
  if(!description) {
    description = '';
  }

  for (var i = 0; i < ids.length; i++) {
    ids[i] = removeWhitespace(ids[i]);
    if (!ObjectID.isValid(ids[i])){
      return res.status(404).send({error: 'One of the Id`s was not valid'});
    }
  }

  User.update({_id: {$in: ids}},{$inc: {totalPoints: addPoints }, $push: {pointLog: {points: addPoints, description}}}, { multi: true }).then((docs) => {
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
    res.send({username, email});
  }).catch(e => res.send(e));
}


exports.addUser = (req, res, next) => {
  let { emails } = req.body;

  if(!emails || !Array.isArray(emails)) {
    return res.status(400).send('error');
  }

  allowedToSignup.find({email: {$in: emails}}).then((docs) => {
    if(docs.length > 0) {
      return res.status(420).send({emails: docs, error: 'emails already used'});
    }

    emails = emails.map((email) => {
      return new allowedToSignup({ email });
    })

    allowedToSignup.insertMany(emails).then(docs => {
      res.send(docs);
    }).catch(e => {
      next(e);
    })
  }).catch(e => res.status(422).send(e));
}
