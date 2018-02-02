const jwt = require('jwt-simple');

const User = require('../models/user');
const allowedToSignup = require('../models/allowedToSignup');
const config = require('../config');

// JSON WEBTOKENS
// sub -> subject -> who does this token belong to
// iat -> issued at time
const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = (req, res, next) => {
  // User has already had their email and password auth'd
  // we just need to give them a token

  // passports done function adds whatever gets passed down by
  // done(null, thisHere) into the 'req' object
  res.send({ token: tokenForUser(req.user), role: req.user.role })

}

exports.validateSignup = (req, res) => {
  const { id: _id } = req.body;
  allowedToSignup.findById(_id).then((doc) => {
    if(!doc) {
      return res.status(404).send('id not found');
    }
    res.send(true);
  }).catch(e => res.status(403).send('error'))
}

exports.signup = (req, res, next) => {
  const { username, password, email } = req.body;

  // check if email and password exist
  if(!username || !password || !email) {
    res.status(400).send({message: 'The Green Goddess does not aprove (username/password is missing)'})
  }

  // See if a user with the given email exists
  User.findOne({ email, username }).then((existingUser) => {
    // If a user with email exists, return error
    if(existingUser) {
      return res.status(420).send({error: 'The Green Goddess does not aprove (username or email already exist)'});
    }

    // if user with email does NOT exist, create and save user record
    const user = new User({
      ...req.body
    })

    user.save().then((user) => {
      // respond to request indicating the user was created
      return res.send({message: 'Your Account is now created', token: tokenForUser(user), username: user.username});
    }, (e) => {
      next(e);
    });
  }, (e) => {
    res.status(422).send({error: 'email or username is in use', e});
  });
};
