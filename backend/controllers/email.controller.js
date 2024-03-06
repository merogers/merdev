// const nodemailer = require("nodemailer");
const createError = require('http-errors');
const emailClient = require('../util/email.util');

const azureEmailFrom = process.env.AZURE_CS_FROM;
const azureEmailTo = process.env.AZURE_CS_TO;

const handleEmail = async (req, res, next) => {
  const { name, email, phone, message, jobRole } = req.body;

  if (!name || !email || !phone || !message) {
    return next(createError(400, 'Missing fields for email message'));
  }

  if (jobRole) {
    return next(createError(400, 'Cannot send message'));
  }

  try {
    const emailMessage = {
      senderAddress: azureEmailFrom,
      content: {
        subject: 'Test Email',
        plainText: `From: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
      },
      recipients: {
        to: [{ address: azureEmailTo }],
      },
    };

    const poller = await emailClient.beginSend(emailMessage);
    await poller.pollUntilDone();

    return res.sendStatus(200);
  } catch (error) {
    next(error);
    return null;
  }
};

module.exports = { handleEmail };
