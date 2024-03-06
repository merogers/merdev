const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const User = require('../models/user.model');

const handleProtectRoute = async (req, _res, next) => {
  const authToken = req.headers.authorization;

  if (authToken === null || !authToken.startsWith('Bearer')) {
    return next(createError(401, 'Unauthorized'));
  }

  try {
    const bearer = authToken.split(' ')[1];
    const decoded = jwt.verify(bearer, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select('-password');

    next();
    return null;
  } catch (error) {
    next(error);
    return null;
  }
};

const handleOwnershipCheck = async (req, _res, next) => {
  const { _id } = req.user;
  const { id } = req.params;

  try {
    if (_id.toString() !== id.toString()) {
      return next(createError(403, 'Unauthorized'));
    }

    next();
    return null;
  } catch (error) {
    next(error);
    return null;
  }
};

module.exports = { handleProtectRoute, handleOwnershipCheck };
