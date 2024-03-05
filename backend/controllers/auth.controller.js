const createError = require('http-errors');

const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const handleGenerateToken = require('../util/token.util');
const { logger } = require('../util/logger.util');

const handleLogin = async (req, res, next) => {
  const { email, password } = req.body;

  // Check for required fields
  if (!email || !password) {
    return next(createError(400, 'Missing Fields'));
  }

  try {
    const user = await User.findOne({ email });

    if (user === null) {
      return next(createError(404, 'User not found'));
    }

    const result = await bcrypt.compare(password, user.password);

    if (!result) {
      return next(createError(400, 'Invalid password'));
    }

    return res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: handleGenerateToken(user._id),
    });
  } catch (error) {
    logger.error(error);
    return next(createError(500, 'Cannot log in user'));
  }
};

module.exports = { handleLogin };
