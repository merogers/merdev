import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

const jwtSecret = process.env.JWT_SECRET as string;

const handleGenerateToken = (id: Types.ObjectId) =>
  jwt.sign({ id }, jwtSecret, {
    expiresIn: '1d',
  });

export default handleGenerateToken;
