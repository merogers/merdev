import type { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';

import type { JwtPayload } from 'jsonwebtoken';
import type { ResponseType } from '../express';

import prisma from '../config/db.config';

export const handleProtectRoute = async (req: any, _res: Response, next: NextFunction): ResponseType => {
  const authToken = req.headers.authorization;
  const jwtSecret = process.env.JWT_SECRET;

  try {
    // Check for JWT secret
    if (jwtSecret === undefined) throw createError(500, 'No JWT Secret defined');

    // Check for auth token
    if (authToken === null || authToken === undefined) throw createError(401, 'Unauthorized');

    // Check if token is in correct format
    if (String(authToken.startsWith('Bearer')) === '' || authToken === 'Bearer')
      throw createError(401, 'Invalid Token Format');

    // Decode token, get user
    const bearer: string = authToken.split(' ')[1];
    const decoded = jwt.verify(bearer, jwtSecret) as JwtPayload;

    const userExists = await prisma.user.findUnique({ where: { id: decoded.id }, select: { id: true } });

    if (userExists === null) throw createError(404, 'User Not Found');

    // Set user in middleware
    req.user = String(userExists.id);
    next();
  } catch (error) {
    next(error);
  }
};
