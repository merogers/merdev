import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { RequestHandler } from 'express';
import { env } from '../config/env.config';
import CreateEmailSchema from '../models/email.model';
import createError from 'http-errors';

const ses = new SESClient(env.AWS_REGION);

const handleSendEmail: RequestHandler = async (req, res, next) => {
  const { name, email, phone, message, jobRole } = req.body;

  const validEmail = CreateEmailSchema.safeParse(req.body);

  if (!validEmail.success) {
    next(createError(400, validEmail.error.flatten()));
  }

  if (!name || !email || !phone || !message) {
    res.status(400);
    throw new Error('Missing fields for email message');
  }

  if (jobRole) {
    next(createError(400, 'Cannot send message'));
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
    Source: `${env.AWS_SES_FROM}`,
  });

  try {
    await ses.send(command);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export default handleSendEmail;
