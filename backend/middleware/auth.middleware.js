const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const { logger } = require('../util/logger.util');

const User = require('../models/user.model');

const handleProtectRoute = async (req, res, next) => {
  let token;

  const authToken = req.headers.authorization;

  if (authToken && authToken.startsWith('Bearer')) {
    try {
      // Get token
      const bearer = authToken.split(' ')[1];
      token = bearer;

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      return next();
    } catch (error) {
      logger.error(error);
      return next(createError(500, 'Cannot Authenticate'));
    }
  }

  if (!token) {
    return next(createError(401, 'Not Authorized'));
  }
};

module.exports = { handleProtectRoute };
