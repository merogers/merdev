import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';

import User from '../models/user.model';

export const handleProtectRoute: RequestHandler = async (req: any, _res, next) => {
  const authToken = req.headers.authorization;
  const jwtSecret = process.env.JWT_SECRET as string;

  if (authToken === null || authToken === undefined) {
    return next(createError(401, 'Unauthorized'));
  }

  if (!authToken.startsWith('Bearer')) {
    return next(createError(401, 'Invalid Token Format'));
  }

  try {
    const bearer = authToken.split(' ')[1];
    const decoded: any = jwt.verify(bearer, jwtSecret);

    const user = await User.findById(decoded.id).select('_id');
    req.user = user?._id.toString();
    next();
    return null;
  } catch (error) {
    next(error);
    return null;
  }
};
