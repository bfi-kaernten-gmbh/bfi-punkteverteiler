const passport = require('passport');

const passportService = require('./services/passport');
const User = require('./models/user');

const auth = require('./controllers/authentication');
const user = require('./controllers/user');
const admin = require('./controllers/admin');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = app => {
  app.get('/', requireAuth, (req, res) => {
    res.send({ message: '...' });
  });

  app.get('/users', requireAuth, auth.roleAuth(['admin']), admin.getUsers);
  app.get('/users/:id', requireAuth, auth.roleAuth(['admin']), admin.getUser);
  // app.put('/users', requireAuth, auth.roleAuth(['admin']), admin.updateUsers);

  app.get('/profile',
    requireAuth,
    auth.roleAuth(['user', 'admin']),
    user.userProfile
  );

  app.post('/signin', requireSignin, auth.signin);
  app.post('/signup', auth.signup);
};
