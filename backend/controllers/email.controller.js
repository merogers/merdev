import createError from 'http-errors';
import emailClient from '../util/email.util.js';
import { testEmail, testName, testPhone, testMessage } from '../util/regex.util.js';

const azureEmailFrom = process.env.AZURE_CS_FROM;
const azureEmailTo = process.env.AZURE_CS_TO;

export const handleEmail = async (req, res, next) => {
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
