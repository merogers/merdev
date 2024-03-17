import type { ErrorRequestHandler } from 'express';
import logger from '../util/logger.util';

const handleErrors: ErrorRequestHandler = async (error, _req, res, next) => {
  const errorStatus = error.statusCode || 500;
  const errorMessage = error.message || 'Something went wrong';
  const env = process.env.NODE_ENV || 'development';

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
    // eslint-disable-next-line
  } catch (error) {
    next(error);
    return null;
  }
};

export default handleErrors;
