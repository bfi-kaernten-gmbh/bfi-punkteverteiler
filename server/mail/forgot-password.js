const nodemailer = require('nodemailer');
const transporter = require('./config');
const config = require('../config');

module.exports = (email, token) => new Promise((resolve, reject) => {
  const mailOptions = {
    from: 'itlabPunkteSystem@gmail.com',
    subject: 'DigiPass password reset',
    to: email,
    html: `<p>Klicken Sie auf folgenden Link um Ihr Passswort zurückzusetzen </p><a href="http://${config.domain}/reset/${token}">click me</a>`
  };
  transporter.sendMail(mailOptions).then((info) => {
    console.log('Email send', info.response);
    resolve('success');
  }).catch(e => {reject(e)});
});
