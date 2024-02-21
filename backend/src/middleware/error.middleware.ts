import type { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import createError from 'http-errors';
import { z } from 'zod';

interface ErrorHandler extends ErrorRequestHandler {
  statusCode: number;
  message: string;
  stack: string;
}

// Handle Express Errors
const errorHandler = (error: ErrorHandler, _req: Request, res: Response, next: NextFunction) => {
  // Return Zod Error
  if (error instanceof z.ZodError) {
    res.status(400).json({
      message: 'Validation Error',
      error: error.flatten(),
    });
  }

  if (res.headersSent) {
    next(error);
  }

  // Return Normal Error
  res.status(error.statusCode).json({
    message: error.message,
    stack: error.stack,
  });
};

// Handle Endpoint Not Found
export const notFoundHandler = (_req: Request, _res: Response, next: NextFunction) => {
  next(createError(404, 'Endpoint not found'));
};

export default errorHandler;
