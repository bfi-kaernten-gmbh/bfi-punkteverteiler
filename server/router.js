const passport = require('passport');

const passportService = require('./services/passport');
const User = require('./models/user');

const Authentication = require('./controllers/authentication');

const requireAuthUser = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
const requireAuthAdmin = passport.authenticate('jwt', {session: false });

module.exports = app => {
  app.get('/', requireAuthUser, (req, res) => {
    res.send({ message: 'PRAISE THE GREEN GODESS' });
  });

  app.get('/users', requireAuthAdmin, (req, res) => {
    
  })

  app.post('/signin', requireSignin, Authentication.signin);

  app.post('/signup', Authentication.signup);
};
