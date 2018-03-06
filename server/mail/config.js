var nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.emailProviderEmail || 'email@gmail.com',
    pass: process.env.emailProviderPw || 'password123'
  }
})

module.exports = transporter;
