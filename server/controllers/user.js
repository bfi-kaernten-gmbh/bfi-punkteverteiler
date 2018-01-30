const _ = require('lodash');

exports.userProfile = (req, res) => {
  let user = _.pick(req.user,
    ['_id','username', 'email', 'firstName','lastName', 'pointLog','totalPoints']
  );
  res.send(user);
}
