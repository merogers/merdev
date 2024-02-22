import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '../config/env.config';
import { hashString } from '../util/crypto';
import User, { LoginInputSchema } from '../models/user.model';
import createError from 'http-errors';
import type { Jwt } from '../middleware/jwt.middleware';

export const loginHandler: RequestHandler = async (req, res, next) => {
  try {
    // Make sure user data is correct
    LoginInputSchema.parse(req.body);

    // Get user from db and check password
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists === null) {
      next(createError(400, 'User not found'));
      return;
    }

    // Password match check
    const expectedHash = hashString(userExists.salt, req.body.password, env.CRYPTO_SECRET);
    if (userExists.password !== expectedHash) {
      next(createError(401, "Password doesn't match"));
      return;
    }

    // Generate & Update Tokens
    const authorizationToken = jwt.sign({ id: userExists.id }, env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: userExists.id }, env.JWT_SECRET, { expiresIn: '1d' });
    await User.findByIdAndUpdate(userExists.id, { refreshToken });

    // Generate Response
    res.header('Authorization', authorizationToken);
    res.cookie('refreshToken', refreshToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      user: {
        id: userExists.id,
        firstName: userExists.firstName,
        lastName: userExists.lastName,
        email: userExists.email,
      },
      authorizationToken,
    });
  } catch (error) {
    next(error);
  }
};

export const handleRefresh: RequestHandler = async (req, res, next) => {
  const { cookies } = req;

  // No Cookies? No access.
  if (cookies?.refreshToken === null) {
    next(createError(401, 'No cookies'));
    return;
  }

  try {
    const { refreshToken } = cookies;

    const user = await User.findOne({ refreshToken });
    if (user === null) {
      next(createError(403, 'Forbidden'));
      return;
    }

    const { id } = jwt.verify(refreshToken, env.JWT_SECRET) as Jwt;

    if (id === null) {
      next(createError(403, 'Forbidden'));
      return;
    }

    const authorizationToken = jwt.sign({ id }, env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ user, authorizationToken });
  } catch (error) {
    next(error);
  }
};

// --- Logout User --- //
export const handleLogout: RequestHandler = async (req, res, next) => {
  const { cookies } = req;

  // No Cookies? Successful request
  if (cookies?.refreshToken === null) {
    res.sendStatus(204);
    return;
  }

  try {
    const { refreshToken } = cookies;
    const user = await User.findOne({ refreshToken });
    if (user === null) {
      res.clearCookie('refreshToken', {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
      });
      res.sendStatus(204);
    }

    await User.updateOne({ refreshToken }, { refreshToken: '' });

    res.clearCookie('refreshToken', {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default loginHandler;
