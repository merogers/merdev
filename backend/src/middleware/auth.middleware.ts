import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import User from '../models/user.model';

import type { JwtPayload } from 'jsonwebtoken';

export interface UserRequest extends Request {
  user: string | undefined;
}

export const handleProtectRoute = async (req: any, _res: Response, next: NextFunction): Promise<any> => {
  const authToken = req.headers.authorization;
  const jwtSecret = process.env.JWT_SECRET;

  if (jwtSecret === undefined) {
    throw createError(500, 'No JWT Secret defined');
  }

  if (authToken === null || authToken === undefined) {
    throw createError(401, 'Unauthorized');
  }

  if (String(authToken.startsWith('Bearer')) === '' || authToken === 'Bearer') {
    throw createError(401, 'Invalid Token Format');
  }

  try {
    const bearer: string = authToken.split(' ')[1];

    const decoded = jwt.verify(bearer, jwtSecret) as JwtPayload;

    const userExists = await User.findById(decoded.id).select('_id');

    if (userExists === null) {
      throw createError(404, 'User Not Found');
    }

    const userID = String(userExists._id);

    req.user = userID;
    next();
  } catch (error) {
    next(error);
  }
};
