import type { Request, Response, NextFunction } from 'express';
import logger from '../util/logger.util';

const handleErrors = async (error: any, _req: Request, res: Response, next: NextFunction): Promise<any> => {
  const errorStatus: number = error.statusCode ?? 500;
  const errorMessage: string = error.message ?? 'Something went wrong';

  try {
    // Log that error
    logger.error(error);

    return res.status(errorStatus).json({
      success: false,
      message: errorMessage,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export default handleErrors;
