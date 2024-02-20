import { RequestHandler } from 'express';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import { hashString, randomString } from '../util/crypto';
import User from '../models/user';

// --- Log in User --- //
export const loginUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (email === undefined || email.length < 6 || !email.includes('@')) {
      return next(createError(400, 'Missing or invalid email'));
    }

    if (password === undefined || password.length < 6) {
      return next(createError(400, 'Password must be longer than 6 characters'));
    }
    const user = await User.findOne({ email });
    if (user === null) return next(createError(404, 'User not found'));
    const expectedHash = hashString(user.salt, password);
    if (user.password !== expectedHash) return next(createError(401, 'Invalid password'));

    const authorizationToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    await User.findByIdAndUpdate(user.id, {
      refreshToken,
    });

    // Return updated user data, ignore credentials.
    const sessionUser = await User.findOne({ _id: user.id }).select('-password -salt');
    // Populate virtual projects field
    await sessionUser.populate('projects');

    // Set Auth Header
    res.header('Authorization', authorizationToken);

    // Set HTTP Only Cookie
    res.cookie('refreshToken', refreshToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ user: sessionUser, authorizationToken });
  } catch (error) {
    console.error(error);
    return next(createError(500, 'Failed to log in user'));
  }
};

// --- Register User --- //
export const registerUser: RequestHandler = async (req, res, next) => {
  const { email, firstName, lastName, password } = req.body;

  try {
    if (email === undefined || email.length < 6 || !email.includes('@')) {
      return next(createError(400, 'Missing or invalid email'));
    }

    if (firstName === undefined || firstName.length < 1) {
      return next(createError(400, 'First Name must be longer than 1 character'));
    }

    if (lastName === undefined || lastName.length < 1) {
      return next(createError(400, 'Last Name must be longer than 1 character'));
    }

    if (password === undefined || password.length < 6) {
      return next(createError(400, 'Password must be longer than 6 characters'));
    }

    const user = await User.findOne({ email });
    if (user !== null) return next(createError(400, 'User already exists'));

    const salt = await randomString();

    const newUser = new User({
      email,
      firstName,
      lastName,
      password: hashString(salt, password),
      salt,
      refreshToken: '',
    });

    await newUser.save();

    return res.status(201).json({ message: 'Success' });
  } catch (error) {
    console.error(error);
    return next(createError(500, 'Failed to register user'));
  }
};

export const refreshJwtToken: RequestHandler = async (req, res, next) => {
  const { cookies } = req;

  // No Cookies? No access.
  if (!cookies?.refreshToken) return next(createError(401, 'No cookies'));

  try {
    const { refreshToken } = cookies;
    const user = await User.findOne({ refreshToken });
    if (user === null) return next(createError(403, 'Forbidden'));

    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err || user.id !== decoded.id) return next(createError(403, 'Forbidden'));
      const authorizationToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      // Set Auth Header
      // res.header('Authorization', authorizationToken);
      return res.status(200).json({ user, authorizationToken });
    });
  } catch (error) {
    console.error(error);
    return next(createError(500, 'Failed to log in user'));
  }
};

// --- Refresh Token --- //
export const logoutUser: RequestHandler = async (req, res, next) => {
  const { cookies } = req;

  // No Cookies? Successful request
  if (!cookies?.refreshToken) return res.sendStatus(204);

  try {
    const { refreshToken } = cookies;
    const user = await User.findOne({ refreshToken });
    if (!user) {
      res.clearCookie('refreshToken', {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
      });
      res.sendStatus(204);
    }

    await User.updateOne({ refreshToken }, { refreshToken: '' });

    res.clearCookie('refreshToken', {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return next(createError(500, 'Failed to delete'));
  }
};
