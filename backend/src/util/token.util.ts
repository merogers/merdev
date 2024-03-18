import jwt from 'jsonwebtoken';
import type { Types } from 'mongoose';
import createError from 'http-errors';

const handleGenerateToken = (id: Types.ObjectId) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    createError(500, 'No JWT Secret');
    return;
  }

  return jwt.sign({ id }, jwtSecret, {
    expiresIn: '1d',
  });
};

export default handleGenerateToken;
