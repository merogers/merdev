import { RequestHandler } from 'express';
import { allowedOrigins } from '../config/cors';

const credentials: RequestHandler = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  next();
};

export default credentials;
