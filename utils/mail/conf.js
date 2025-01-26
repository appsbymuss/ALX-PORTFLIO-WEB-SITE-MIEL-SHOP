const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.PRIMARY_EMAIL,
      pass: process.env.PRIMARY_EMAIL_TOKEN
    }
});

module.exports = transporter;