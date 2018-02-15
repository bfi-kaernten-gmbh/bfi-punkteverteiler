const passport = require('passport');

const passportService = require('./services/passport');
const User = require('./models/user');

const auth = require('./controllers/authentication');
const user = require('./controllers/user');
const admin = require('./controllers/admin');
const validate = require('./services/routeValidators');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = app => {
  app.get('/', requireAuth, (req, res) => {
    res.send({ message: '...' });
  });

  // admin routes
  app.get('/users',
    requireAuth, validate.role(['admin']),
    admin.getUsers
  );
  app.get('/users/:id',
    requireAuth, validate.id, validate.role(['admin']),
    admin.getUser
  );
  app.patch('/users',
    requireAuth, validate.role(['admin']),
    admin.addPoints
  );
  app.delete('/users/:id',
    requireAuth, validate.id, validate.role(['admin']),
    admin.removeUser
  );

  // user routes
  app.get('/profile',
    requireAuth, validate.role(['user', 'admin']),
    user.userProfile
  );

  // authentication routes
  app.post('/signin', requireSignin, auth.signin);
  app.post('/signup/:id', validate.id, auth.signup);

  app.post('/validate/signup',validate.id, auth.validateSignup);
  app.post('/users', admin.addUser)
};
