const jwt = require('jwt-simple');

const User = require('../models/user');
const allowedToSignup = require('../models/allowedToSignup');
const config = require('../config');
const forgotPasswordEmail = require('../mail/forgot-password');

// JSON WEBTOKENS
// sub -> subject -> who does this token belong to
// iat -> issued at time
const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = (req, res, next) => {
  const { role, _id } = req.user;
  // User has already had their email and password auth'd
  // we just need to give them a token

  // passports done function adds whatever gets passed down by
  // done(null, thisHere) into the 'req' object
  res.send({ token: tokenForUser(req.user), role,_id});

}

exports.validateSignup = (req, res) => {
  const { id } = req.body;
  if(!id) {
    return res.status(400).send('bad request (provide an id)')
  }

  allowedToSignup.findById(id).then((doc) => {
    if(!doc) {
      return res.status(403).send('Unauthorized');
    }
    res.send({ signupValid: true, email: doc.email});
  }).catch(e => res.status(403).send({ signupValid: 'error' }))
}

exports.signup = (req, res, next) => {
  const { id } = req.params;
  const { username, password, email } = req.body;

  // check if email and password exist
  if(!username || !password || !email) {
    res.status(400).send({error: 'The Green Goddess does not aprove (username/password is missing)'})
  }

  allowedToSignup.findById(id).then((allowed) => {
    if(!allowed) {
      return res.status(400).send({error: 'you are not allowed to signup'})
    }

    User.findOne({$or: [{username}, {email} ]}).then((existingUser) => {
      console.log(existingUser);
      // If a user with email exists, return error
      if(existingUser) {
        return res.status(420).send({error: 'The Green Goddess does not aprove (username or email already exist)'});
      }

      // if user with email does NOT exist, create and save user record
      const user = new User({
        ...req.body
      })
      console.log(user);

      user.save().then((user) => {
        // respond to request indicating the user was created
        allowedToSignup.findByIdAndRemove(id).then((del) => {
          console.log(del);
        }).catch(e => { next(e) })
        return res.send({message: 'Your Account is now created', token: tokenForUser(user), _id: user._id});
      }).catch((e) => {
        next(e);
      });
    }).catch((e) => {
      res.status(422).send({error: 'email or username is in use', e});
    });
  })
};


exports.changePassword = (req, res, next) => {
  const { username } = req.user;
  const password = req.hashedPassword;

  if(!password) {
    return res.status(400).send('sth went wrong')
  }

  User.findOneAndUpdate({ username }, {password}).then((doc) => {
    console.log(doc);
    res.send('Ihr Passwort wurde erfolgreich geändert');
  }).catch(e => res.send(e));
}

exports.resetPassword = (req, res, next) => {
  const { _id, hashedPassword } = req;

  User.findByIdAndUpdate({_id}, {password: hashedPassword}).then((doc) => {
    console.log(doc);
    res.send('Ihr Passwort wurde erfolgreich geändert');
  }).catch(e => res.send(e));
}

// generate Token for stuff
const forgotPasswordToken = (id) => {
  const date = new Date();
  const timestamp = date.getTime();
  const expirationTime = date.setDate(date.getDate() + 1);
  return jwt.encode({ sub: id, iat: timestamp, exp: expirationTime }, config.secret);
}

exports.forgotPassword = (req, res, next) => {
  const { username, email } = req.body;

  User.findOne({$or: [{username}, {email} ]}).then((user) => {
    if(!user) {
      return res.status(404).send('User not found');
    }
    const token = forgotPasswordToken(user._id);
    forgotPasswordEmail(user.email, token)
    res.send('Kindly check your email for further instructions');
  }).catch(e => res.send(e))
}
