import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import User from '../models/user.model';

import type { JwtPayload } from 'jsonwebtoken';

export interface UserRequest extends Request {
  user: string | undefined;
}

export const handleProtectRoute = async (req: any, _res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization;
  const jwtSecret = process.env.JWT_SECRET;

  if (jwtSecret === undefined) {
    next(createError(500, 'No JWT Secret defined'));
    return;
  }

  if (authToken === null || authToken === undefined) {
    next(createError(401, 'Unauthorized'));
    return;
  }

  if (!authToken.startsWith('Bearer') || authToken === 'Bearer') {
    next(createError(401, 'Invalid Token Format'));
    return;
  }

  try {
    const bearer: string = authToken.split(' ')[1];

    const decoded = jwt.verify(bearer, jwtSecret) as JwtPayload;

    console.log(decoded);

    const userExists = await User.findById(decoded.id).select('_id');

    if (userExists === null) {
      next(createError(404, 'User Not Found'));
      return;
    }

    const userID = String(userExists._id);

    req.user = userID;
    next();
  } catch (error) {
    next(error);
    return null;
  }
};
