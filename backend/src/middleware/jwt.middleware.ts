import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { env } from '../config/env.config';

export interface Jwt {
  id: string;
  iat: number;
  exp: number;
}

export interface TokenRequest extends Request {
  user?: string;
}

const verifyJWT = (req: TokenRequest, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return next(createError(401, 'Unauthorized'));

    const token = authHeader.split(' ')[1];
    if (!token) return next(createError(401, 'Unauthorized'));
    const { id } = jwt.verify(token, env.JWT_SECRET) as Jwt;

    req.user = id;
    console.log('JWT', id);
    next();
  } catch (error) {
    next(error);
  }
};

export default verifyJWT;
