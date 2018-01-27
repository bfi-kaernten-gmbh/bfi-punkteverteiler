exports.userProfile = (req, res) => {
  res.send(req.user);
}
