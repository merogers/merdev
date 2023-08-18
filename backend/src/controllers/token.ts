import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import User from '../models/user';

// --- Refresh Token --- //
export const refreshJwtToken: RequestHandler = async (req, res, next) => {
  const { cookies } = req;

  // No Cookies? No access.
  if (!cookies?.refreshToken) return next(createError(401, 'No cookies'));

  try {
    const { refreshToken } = cookies;
    const user = await User.findOne({ refreshToken });
    if (user === null) return next(createError(403, 'Forbidden'));

    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err || user.id !== decoded.id) return next(createError(403, 'Forbidden'));
      const authorizationToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      // Set Auth Header
      // res.header('Authorization', authorizationToken);
      return res.status(200).json({ user, authorizationToken });
    });
  } catch (error) {
    console.error(error);
    return next(createError(500, 'Failed to log in user'));
  }
};

// --- Refresh Token --- //
export const logoutUser: RequestHandler = async (req, res, next) => {
  const { cookies } = req;

  // No Cookies? Successful request
  if (!cookies?.refreshToken) return res.sendStatus(204);

  try {
    const { refreshToken } = cookies;
    const user = await User.findOne({ refreshToken });
    if (!user) {
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
    console.error(error);
    return next(createError(500, 'Failed to delete'));
  }
};
