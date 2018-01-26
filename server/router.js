const passport = require('passport');

const passportService = require('./services/passport');
const User = require('./models/user');

const auth = require('./controllers/authentication');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = app => {
  app.get('/', requireAuth, (req, res) => {
    console.log(req.user);
    res.send({ message: 'PRAISE THE GREEN GODESS' });
  });

  app.get('/users', requireAuth, auth.roleAuth(['admin']), (req, res) => {
    res.send({ message: 'it works' });
  })

  app.post('/signin', requireSignin, auth.signin);

  app.post('/signup', auth.signup);
};
