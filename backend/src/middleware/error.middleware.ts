import type { Request, Response, NextFunction } from 'express';
import logger from '../util/logger.util';

const handleErrors = async (error: unknown, _req: Request, res: Response, next: NextFunction): Promise<any> => {
  const errorStatus: number | undefined = 500;
  const errorMessage: string | undefined = 'Something went wrong';

  try {
    // Log that error
    logger.error(error);

    // Send Error Stack
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
    });
  } catch (error) {
    next(error);
  }
};

export default handleErrors;
