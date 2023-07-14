import { ErrorRequestHandler, RequestHandler } from 'express';
import createError from 'http-errors';

// Handle Express Errors
const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  const statusCode = error.statusCode || 500;
  const statusMessage = error.message || 'Unexpected Error';
  const stack = process.env.NODE_ENV === 'production' ? null : error.stack;

  if (res.headersSent) {
    return next(error);
  }

  return res.status(statusCode).json({
    message: statusMessage,
    stack,
  });
};

// Handle Endpoint Not Found
export const notFound: RequestHandler = (_req, _res, next) => next(createError(404, 'Endpoint not found'));

export default errorHandler;
