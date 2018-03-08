const nodemailer = require('nodemailer');
const transporter = require('./config');

module.exports = (email, token) => new Promise((resolve, reject) => {
  const mailOptions = {
    from: 'itlabPunkteSystem@gmail.com',
    subject: 'Digi Pass Paswort Reset ',
    to: email,
    html: `<p>text text text </p><a href="http://localhost:3000/forgot/${token}">click me</a>`
  };
  transporter.sendMail(mailOptions).then((info) => {
    console.log('Email send', info.response);
    resolve('success');
  }).catch(e => {reject(e)});
});
