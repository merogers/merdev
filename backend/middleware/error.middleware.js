const { logger } = require('../util/logger.util');

const handleErrors = (error, _req, res, next) => {
  const errorStatus = error.statusCode || 500;
  const errorMessage = error.message || 'Something went wrong';
  const nodeEnv = process.env.NODE_ENV || 'development';

  // Log that error
  logger.error(error);

  // Send Error Stack
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: nodeEnv !== 'production' ? error.stack : {},
  });
};

module.exports = {
  handleErrors,
};
