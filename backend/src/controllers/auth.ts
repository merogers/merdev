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

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    await User.findByIdAndUpdate(user.id, {
      sessionToken: refreshToken,
    });

    // Return updated user data, ignore credentials
    const sessionUser = await User.findById(user.id).select('-password  -salt');

    const userData = {
      id: sessionUser.id,
      name: sessionUser.name,
      email: sessionUser.email,
      sessionToken: sessionUser.sessionToken,
    };

    res.header('Authorization', accessToken);

    res.cookie('refreshToken', refreshToken, {
      secure: process.env.NODE_ENV !== 'development',
      httpOnly: true,
      sameSite: 'strict',
    });

    return res.status(200).json({ user: userData });
  } catch (error) {
    console.error(error);
    return next(createError(500, 'Failed to log in user'));
  }
};

// --- Register User --- //
export const registerUser: RequestHandler = async (req, res, next) => {
  const { email, name, password } = req.body;

  try {
    if (email === undefined || email.length < 6 || !email.includes('@')) {
      return next(createError(400, 'Missing or invalid email'));
    }

    if (name === undefined || name.length < 1) return next(createError(400, 'Name must be longer than 1 character'));

    if (password === undefined || password.length < 6) {
      return next(createError(400, 'Password must be longer than 6 characters'));
    }

    const user = await User.findOne({ email });
    if (user !== null) return next(createError(400, 'User already exists'));

    const salt = await randomString();

    const newUser = new User({
      email,
      name,
      password: hashString(salt, password),
      salt,
      sessionToken: '',
    });

    await newUser.save();

    return res.status(201).json({ message: 'Success' });
  } catch (error) {
    console.error(error);
    return next(createError(500, 'Failed to register user'));
  }
};

// --- Refresh Token --- //

export const refresh: RequestHandler = async (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return next(createError(401, 'Access denied. No refresh token'));
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.SECRET);
    const accessToken = jwt.sign({ user: decoded.user }, process.env.SECRET, { expiresIn: '1h' });

    res.header('Authorization', accessToken).send(decoded.user);
  } catch (error) {
    return next(createError(400, 'Invalid refresh token'));
  }
};
