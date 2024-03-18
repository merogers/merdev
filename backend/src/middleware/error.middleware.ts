import type { Request, Response, NextFunction } from 'express';
import logger from '../util/logger.util';

const handleErrors = async (error: any, _req: Request, res: Response, next: NextFunction) => {
  const errorStatus: number = error.statusCode || 500;
  const errorMessage: string = error.message || 'Something went wrong';
  const env = process.env.NODE_ENV;

  try {
    // Log that error
    logger.error(error);

    // Send Error Stack
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: env !== 'production' ? error.stack : {},
    });
  } catch (error) {
    next(error);
    return null;
  }
};

export default handleErrors;
