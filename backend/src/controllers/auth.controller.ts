import createError from 'http-errors';
import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import handleGenerateToken from '../util/token.util';

import { testEmail, testPassword } from '../util/regex.util';

export const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: { email: string; password: string } = req.body;

  const validEmail = testEmail(email);
  const validPassword = testPassword(password);

  // Validate user input
  if (!validEmail || !validPassword) {
    next(createError(400, 'Invalid Login. Email must be valid, and password must be between 8 and 25 characters long'));
    return;
  }

  try {
    const user = await User.findOne({ email });

    if (user === null) {
      next(createError(404, 'User not found'));
      return;
    }

    const result = await bcrypt.compare(password, user.password);

    if (!result) {
      next(createError(400, 'Invalid password'));
      return;
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
