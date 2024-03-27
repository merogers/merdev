import createError from 'http-errors';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { testEmail, testName, testPhone, testMessage } from '../util/regex.util';
import type { Request, Response, NextFunction } from 'express';

import type { ResponseType, EmailBody } from '../express';

export const handleEmail = async (req: Request, res: Response, next: NextFunction): ResponseType => {
  const { name, email, phone, message, jobRole }: EmailBody = req.body;

  const validName = testName(name);
  const validEmail = testEmail(email);
  const validPhone = testPhone(phone);
  const validMessage = testMessage(message);

  // AWS Config
  const AWS_REGION = process.env.AWS_REGION;
  const AWS_SES_TO = process.env.AWS_SES_TO;
  const AWS_SES_FROM = process.env.AWS_SES_FROM;

  const sesClient = new SESClient({ region: AWS_REGION });

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
    // Validate user input
    if (!validName || !validEmail || !validPhone || !validMessage) {
      throw createError(
        400,
        'Invalid Input. Name must be between 1 and 25 characters long, message must be between 1 and 250 characters long with no special characters, email and phone must be valid',
      );
    }

    // Honeypot - Spam Protection
    if (jobRole !== '') throw createError(400, 'Cannot send message');

    // Send email
    await sesClient.send(command);

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
