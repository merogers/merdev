import createError from 'http-errors';
import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import handleGenerateAuthToken, { handleGenerateRefreshToken } from '../util/token.util';
import jwt from 'jsonwebtoken';
import { testEmail, testPassword } from '../util/regex.util';

import type { ResponseType, LoginBody } from '../express';
import type { JwtPayload } from 'jsonwebtoken';

export const handleLogin = async (req: Request, res: Response, next: NextFunction): ResponseType => {
  const { email, password }: LoginBody = req.body;

  const validEmail = testEmail(email);
  const validPassword = testPassword(password);

  try {
    // Validate user input
    if (!validEmail || !validPassword) {
      throw createError(
        400,
        'Invalid Login. Email must be valid, and password must be between 8 and 25 characters long',
      );
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (user === null) throw createError(404, 'User not found');

    // Check password matches
    const result = await bcrypt.compare(password, user.password);
    if (!result) throw createError(400, 'Invalid password');

    return res
      .status(200)
      .cookie('refreshToken', handleGenerateRefreshToken(String(user._id)), { httpOnly: true, sameSite: 'strict' })
      .json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        authtoken: handleGenerateAuthToken(String(user._id)),
      });
  } catch (error) {
    next(error);
  }
};

export const handleRefresh = async (req: Request, res: Response, next: NextFunction): ResponseType => {
  const refreshToken: string = req.cookies.refreshToken;
  const jwtSecret = process.env.JWT_SECRET;

  try {
    // Check for JWT secret
    if (jwtSecret === undefined) throw createError(500, 'No JWT Secret Defined');

    // Check for refresh token
    if (refreshToken === undefined) throw createError(401, 'No Refresh Token');

    const decoded = jwt.verify(refreshToken, jwtSecret) as JwtPayload;

    // Get user from token
    const userExists = await User.findById(decoded.id).select('-password');
    if (userExists === null) throw createError(404, 'User not found');

    res
      .header('Authorization', handleGenerateAuthToken(String(decoded.id)))
      .status(200)
      .json({
        _id: userExists._id,
        firstName: userExists.firstName,
        lastName: userExists.lastName,
        email: userExists.email,
        authtoken: handleGenerateAuthToken(String(decoded.id)),
      });
  } catch (error) {
    next(error);
  }
};
