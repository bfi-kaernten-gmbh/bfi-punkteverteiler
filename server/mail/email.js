var nodemailer = require('nodemailer');
const transporter = require('./config');

var mailOptions = {
  from: 'itlabPunkteSystem@gmail.com',
  subject: 'Einladung zum BFI Gewinnspiel',
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
      html: `<p>text text text </p><a href="http://localhost:3000/signup/${_id}">signup here</a>`
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
