import { ErrorRequestHandler, RequestHandler } from 'express';
import createError from 'http-errors';
import { env } from '../config/env.config';
import { ZodError } from 'zod';

// Handle Express Errors
const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  const statusCode = error.statusCode || 500;
  const statusMessage = error.message || 'Unexpected Error';

  if (error instanceof ZodError) {
    return res.status(400).json({ message: 'Invalid Request', errors: error.flatten() });
  }

  if (res.headersSent) {
    return next(error);
  }

  if (env.NODE_ENV === 'development') {
    return res.status(statusCode).json({
      message: statusMessage,
      stack: error.stack,
    });
  } else {
    return res.status(statusCode).json({
      message: statusMessage,
    });
  }
};

// Handle Endpoint Not Found
export const notFoundHandler: RequestHandler = (_req, _res, next) => next(createError(404, 'Endpoint not found'));

export default errorHandler;
