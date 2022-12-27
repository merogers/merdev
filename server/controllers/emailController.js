// const nodemailer = require("nodemailer");
const asyncHandler = require('express-async-handler');
const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_API_KEY);

const sendGrid = asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    res.status(400);
    throw new Error('Missing fields for email message');
  }

  const output = `
    Name: ${name}\r\n
    Email: ${email}\r\n
    Phone: ${phone}\r\n
    Message: ${message}
  `;

  const data = {
    to: 'michelle@merogers.dev',
    from: 'mailer@merogers.dev',
    subject: 'merogers.dev Contact Form Message',
    text: output,
    html: output.replace(/\r\n/g, '<br>'),
  };

  const sent = mail.send(data);

  if (sent) {
    res.status(200).json({ status: 'Ok' });
  } else {
    res.status(400);
    throw new Error('Failed to send email message');
  }
});

module.exports = { sendGrid };
