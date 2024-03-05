const createError = require('http-errors');
const { logger } = require('http-errors');

const handleHealthCheck = async (_req, res, next) => {
  try {
    return res.sendStatus(200);
  } catch (error) {
    logger.error(error);
    return next(createError(500, 'Cannot initialize health check'));
  }
};

module.exports = { handleHealthCheck };
