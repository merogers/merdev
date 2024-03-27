import type { Request, Response, NextFunction } from 'express';
import logger from '../util/logger.util';

const handleErrors = async (error: any, _req: Request, res: Response, next: NextFunction): Promise<any> => {
  const errorStatus: number = error.statusCode ?? 500;
  const errorMessage: string = error.message ?? 'Something went wrong';
  const validationErrors: Record<PropertyKey, unknown> = error.errors ?? {};

  try {
    // Generate validation errors if mongoose schema validation fails
    if (error.name === 'ValidationError') {
      Object.keys(validationErrors).forEach((key) => {
        validationErrors[key] = error.errors[key].message;
      });
    }

    // Log that error
    logger.error(error);

    return res.status(errorStatus).json({
      success: false,
      message: errorMessage,
      errors: validationErrors,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export default handleErrors;
