import createError from 'http-errors';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { testEmail, testName, testPhone, testMessage } from '../util/regex.util';
import { RequestHandler } from 'express';

// AWS Config
const AWS_REGION = process.env.AWS_REGION as string;
const AWS_SES_TO = process.env.AWS_SES_TO as string;
const AWS_SES_FROM = process.env.AWS_SES_FROM as string;

const sesClient = new SESClient(AWS_REGION);

export const handleEmail: RequestHandler = async (req, res, next) => {
  const { name, email, phone, message, jobRole } = req.body;

  const validName = testName(name);
  const validEmail = testEmail(email);
  const validPhone = testPhone(phone);
  const validMessage = testMessage(message);

  // Validate user input
  if (validName === false || validEmail === false || validPhone === false || validMessage === false) {
    return next(
      createError(
        400,
        'Invalid Input. Name must be between 1 and 25 characters long, message must be between 1 and 250 characters long with no special characters, email and phone must be valid',
      ),
    );
  }

  // Honeypot - Spam Protection
  if (jobRole) {
    return next(createError(400, 'Cannot send message'));
  }

  // Email generation command
  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: [`${AWS_SES_TO}`],
    },
    Message: {
      Body: {
        /* required */
        Html: {
          Charset: 'UTF-8',
          Data: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Message:</strong> ${message}</p>`,
        },
        Text: {
          Charset: 'UTF-8',
          Data: `Name: ${name}, Email: ${email}, Phone: ${phone} Message: ${message}`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `Submission from ${name}`,
      },
    },
    Source: `${AWS_SES_FROM}`,
  });

  try {
    await sesClient.send(command);
    return res.sendStatus(200);
  } catch (error) {
    next(error);
    return null;
  }
};
