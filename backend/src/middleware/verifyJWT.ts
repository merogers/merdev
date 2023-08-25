import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import createError from 'http-errors';
import { TokenRequest } from '../types';

const verifyJWT = (req: TokenRequest, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next(createError('401', 'Cannot Verify JWT'));
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return next(createError('403', 'Invalid JWT Token'));
    req.user = decoded.user;
    return next();
  });
};

export default verifyJWT;
