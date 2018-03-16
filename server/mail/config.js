var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'login-1.hoststar.at',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER || 'digipass@itlabs.at',
    pass: process.env.EMAIL_PASSWORD || 'password'
  }
})

module.exports = transporter;
