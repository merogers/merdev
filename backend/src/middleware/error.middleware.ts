// import type { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
// import { unwatchFile } from 'fs';
// import createError from 'http-errors';
// import { z } from 'zod';

// interface ErrorHandler extends ErrorRequestHandler {
//   statusCode: number;
//   message: string;
//   stack: string;
// }

// Handle Express Errors
// const errorHandler = (error: ErrorHandler, _req: Request, res: Response, next: NextFunction) => {
//   // Return Zod Error
//   if (error instanceof z.ZodError) {
//     res.status(400).json({
//       message: 'Validation Error',
//       error: error.flatten(),
//     });
//   }

//   if (res.headersSent) {
//     next(error);
//   }

//   console.log(error.statusCode);

//   // Return Normal Error
//   res.status(400).json({
//     message: error.message,
//     stack: error.stack,
//   });
// };

import { ErrorRequestHandler, RequestHandler } from 'express';
import createError from 'http-errors';
import { z } from 'zod';

// Handle Express Errors
const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  const statusCode = error.statusCode || 500;
  const statusMessage = error.message || 'Unexpected Error';
  const stack = process.env.NODE_ENV === 'production' ? null : error.stack;

  // Return Zod Error
  if (error instanceof z.ZodError) {
    res.status(400).json({
      message: 'Validation Error',
      error: error.flatten(),
    });
  }

  if (res.headersSent) {
    return next(error);
  }

  return res.status(statusCode).json({
    message: statusMessage,
    stack,
  });
};

// Handle Endpoint Not Found
export const notFoundHandler: RequestHandler = (_req, _res, next) => next(createError(404, 'Endpoint not found'));

export default errorHandler;
