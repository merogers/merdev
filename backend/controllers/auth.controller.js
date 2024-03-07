import createError from 'http-errors';

import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import handleGenerateToken from '../util/token.util.js';

import { testEmail, testPassword } from '../util/regex.util.js';

export const handleLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const validEmail = testEmail(email);
  const validPassword = testPassword(password);

  // Validate user input
  if (validEmail === false || validPassword === false) {
    return next(
      createError(400, 'Invalid Login. Email must be valid, and password must be between 8 and 25 characters long'),
    );
  }

  try {
    const user = await User.findOne({ email });

    if (user === null) {
      return next(createError(404, 'User not found'));
    }

    const result = await bcrypt.compare(password, user.password);

    if (!result) {
      return next(createError(400, 'Invalid password'));
    }

    return res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: handleGenerateToken(user._id),
    });
  } catch (error) {
    next(error);
    return null;
  }
};
