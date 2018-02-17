const { mongoose } = require('./mongoose');
const User = require('../models/user');

const users = [
  {
    email: 'markus@gmail.com',
    username: 'markus.maelzer',
    password: '1234',
    firstName: 'markus',
    lastName: 'mälzer',
    role: 'admin'
  },
  {
    email: 'wenge@gmail.com',
    username: 'wenge.wenge',
    password: '1234',
    firstName: 'wenge',
    lastName: 'wenge',
  },
  {
    email: 'test@gmail.com',
    username: 'test.asd',
    password: '1234',
    firstName: 'test',
    lastName: 'asd',
  },
  {
    email: 'lukas@gmail.com',
    username: 'lukas.muussnig',
    password: '1234',
    firstName: 'lukas',
    lastName: 'muusnig',
  }
]

var i = 0;
function sth() {
  if(i <= users.length) {
    const user = new User({
      ...users[i]
    })
    user.save().then((doc) => {
      console.log(doc);
    })
    i++;
    sth();
  }
};
sth();
