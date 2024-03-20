import jwt from 'jsonwebtoken';
import createError from 'http-errors';

const handleGenerateAuthToken = (id: string): string => {
  const jwtSecret = process.env.JWT_SECRET;
  if (jwtSecret === undefined) {
    throw createError(500, 'No JWT Secret');
  }

  return jwt.sign({ id }, jwtSecret, {
    expiresIn: '1h',
  });
};

export const handleGenerateRefreshToken = (id: string): string => {
  const jwtSecret = process.env.JWT_SECRET;
  if (jwtSecret === undefined) {
    throw createError(500, 'No JWT Secret');
  }

  return jwt.sign({ id }, jwtSecret, {
    expiresIn: '1d',
  });
};

export default handleGenerateAuthToken;
