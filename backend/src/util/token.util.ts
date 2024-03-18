import jwt from 'jsonwebtoken';
import createError from 'http-errors';

const handleGenerateAuthToken = (id: string) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    createError(500, 'No JWT Secret');
    return;
  }

  return jwt.sign({ id }, jwtSecret, {
    expiresIn: '1h',
  });
};

export const handleGenerateRefreshToken = (id: string) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    createError(500, 'No JWT Secret');
    return;
  }

  return jwt.sign({ id }, jwtSecret, {
    expiresIn: '1d',
  });
};

export default handleGenerateAuthToken;
