import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { RequestHandler } from 'express';

const ses = new SESClient(process.env.AWS_REGION);

const sendSES: RequestHandler = async (req, res) => {
  const { name, email, phone, message, jobRole } = req.body;

  if (!name || !email || !phone || !message) {
    res.status(400);
    throw new Error('Missing fields for email message');
  }

  if (jobRole) {
    res.status(400);
    throw new Error('Cannot send message');
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

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500);
    throw new Error('Cannot send message');
  }
};

export default sendSES;
