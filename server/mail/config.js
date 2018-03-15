var nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.emailProviderEmail || 'markus.maelzer@gmail.com',
    pass: process.env.emailProviderPw || 'IntoTheVault'
  }
})

module.exports = transporter;
