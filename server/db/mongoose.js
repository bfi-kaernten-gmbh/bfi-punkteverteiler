const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const dbConnect = process.env.dbConnect ? `${process.env.dbConnect}` : 'mongodb://localhost:27017/users';
mongoose.connect(dbConnect, {
  useMongoClient: true
});

module.exports = { mongoose };
