const User = require('../models/user');

exports.userProfile = (req, res) => {
  res.send(req.user);
}
