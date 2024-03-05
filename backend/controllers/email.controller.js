// const nodemailer = require("nodemailer");
const createError = require('http-errors');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const { logger } = require('../util/logger.util');

const ses = new SESClient(process.env.AWS_REGION);

const handleEmail = async (req, res, next) => {
  const { name, email, phone, message, jobRole } = req.body;

  if (!name || !email || !phone || !message) {
    return next(createError(400, 'Missing fields for email message'));
  }

  if (jobRole) {
    return next(createError(400, 'Cannot send message'));
  }

  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: [`${process.env.AWS_SES_TO}`],
    },
    Message: {
      Body: {
        /* required */
        Html: {
          Charset: 'UTF-8',
          Data: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
        },
        Text: {
          Charset: 'UTF-8',
          Data: `Name: ${name}, Email: ${email}, Message: ${message}`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `Submission from ${name}`,
      },
    },
    Source: `${process.env.AWS_SES_FROM}`,
  });

  try {
    await ses.send(command);

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    logger.error(error);
    return next(createError(500, 'Cannot send message'));
  }
};

module.exports = { handleEmail };
