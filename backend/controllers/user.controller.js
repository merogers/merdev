import bcrypt from 'bcrypt';
import createError from 'http-errors';
import { isValidObjectId } from 'mongoose';

import User from '../models/user.model.js';

export const handleCreateUser = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;

  // Check for Blank fields
  if (!email || !password || !firstName || !lastName) {
    return next(createError(400, 'Missing fields'));
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists !== null) {
      return next(createError(400, 'User already exists'));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUserData = {
      email,
      password: hashedPassword,
      firstName,
      lastName,
    };
    const newUser = await User.create(newUserData);

    const newUserJson = newUser.toJSON();

    return res.status(201).json(newUserJson);
  } catch (error) {
    next(error);
    return null;
  }
};

export const handleUserDetails = async (req, res, next) => {
  const { id } = req.params;

  if (isValidObjectId(id) === false) {
    return next(createError(400, 'Invalid User ID format'));
  }

  try {
    const user = await User.findById(id).select('-password');

    if (user === null) {
      return next(createError(404, 'User not found'));
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
    return null;
  }
};

export const handleUpdateUser = async (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName, email, password } = req.body;

  if (isValidObjectId(id) === false) {
    return next(createError(400, 'Invalid User ID format'));
  }

  if (!id || !firstName || !lastName || !email || !password) {
    return next(createError(400, 'Missing Fields'));
  }

  try {
    const user = await User.findById(id);

    if (user === null) {
      return next(createError(404, 'User not found'));
    }

    const updatedUserBody = {
      firstName,
      lastName,
      email,
      password,
    };

    const updatedUser = await User.findByIdAndUpdate({ _id: id }, updatedUserBody, { new: true }).select('-password');

    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
    return null;
  }
};

export const handleDeleteUser = async (req, res, next) => {
  const { id } = req.params;

  if (isValidObjectId(id) === false) {
    return next(createError(400, 'Invalid User ID format'));
  }

  try {
    const user = await User.findById(id);

    if (user === null) {
      return next(createError(404, 'User not found'));
    }

    await User.deleteOne({ _id: id });

    return res.status(200).json({ id });
  } catch (error) {
    next(error);
    return null;
  }
};
