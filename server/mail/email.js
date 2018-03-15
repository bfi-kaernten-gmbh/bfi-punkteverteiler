const nodemailer = require('nodemailer');
const transporter = require('./config');
const config = require('../config');

let mailOptions = {
  from: 'itlabPunkteSystem@gmail.com',
  subject: 'Anmeldung zum BFI-DigiPass.',
};

function createMail(emails) {
  this.i = 0;
  this.transporter = transporter;
  this.emails = emails;

  const iterator = () => {
    this.i++;
    createOptions();
  }

  const sendMail = () => {
    this.transporter.sendMail(this.mailOptions).then((info) => {
      console.log('Email send', info.response);
      checkLoop();
    }).catch((e) => {
      console.log(e);
    });
  }

  const createOptions = () => {
    let { email, _id } = this.emails[this.i];
    this.mailOptions = {
      ...mailOptions,
      to: email,
      html: `<p>Bitte klicke auf folgenden Link um die Anmeldung abzuschließen. </p><a href="http://${config.domain}/signup/${_id}">Signup Here</a><br><p>Liebe Grüße</p> <p>Deine digitale Personalabteilung</p>`
    }
    sendMail();
  }

  const checkLoop = () => {
    if(this.i < (this.emails.length - 1)) {
      iterator();
    } else {
      console.log('done');
    }
  }

  this.start = () => {
    createOptions();
  }
}

module.exports = createMail;
