import bcrypt from 'bcrypt';
import createError from 'http-errors';
import { isValidObjectId } from 'mongoose';
import { RequestHandler } from 'express';

import User from '../models/user.model';
import { testEmail, testName, testPassword } from '../util/regex.util';

export const handleCreateUser: RequestHandler = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;

  const validEmail = testEmail(email);
  const validPassword = testPassword(password);
  const validFirstName = testName(firstName);
  const validLastName = testName(lastName);

  // Validate user input
  if (validEmail === false || validPassword === false || validFirstName === false || validLastName === false) {
    return next(
      createError(
        400,
        'Invalid User. Email must be valid, password must be between 8 and 25 charactgers long, firstName and lastName must be between 1 and 25 characters long with no special characters',
      ),
    );
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

    // Create user, and return without password
    const newUser = await User.create(newUserData);
    const newUserJson = newUser.toJSON();
    return res.status(201).json(newUserJson);
  } catch (error) {
    next(error);
    return null;
  }
};

export const handleUserDetails: RequestHandler = async (req: any, res, next) => {
  const { id } = req.params;

  if (isValidObjectId(id) === false) {
    return next(createError(400, 'Invalid User ID format'));
  }

  try {
    const user = await User.findById(id).select('-password');

    if (user === null) {
      return next(createError(404, 'User not found'));
    }

    if (req.user !== user._id.toString()) {
      return next(createError(403, 'Unauthorized'));
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
    return null;
  }
};

export const handleUpdateUser: RequestHandler = async (req: any, res, next) => {
  const { id } = req.params;
  const { firstName, lastName, email, password } = req.body;

  if (isValidObjectId(id) === false) {
    return next(createError(400, 'Invalid User ID format'));
  }

  const validEmail = testEmail(email);
  const validPassword = testPassword(password);
  const validFirstName = testName(firstName);
  const validLastName = testName(lastName);

  // Validate user input
  if (validEmail === false || validPassword === false || validFirstName === false || validLastName === false) {
    return next(
      createError(
        400,
        'Invalid User. Email must be valid, password must be between 8 and 25 charactgers long, firstName and lastName must be between 1 and 25 characters long with no special characters',
      ),
    );
  }

  try {
    const user = await User.findById(id);

    if (user === null) {
      return next(createError(404, 'User not found'));
    }

    if (req.user !== user._id.toString()) {
      return next(createError(403, 'Unauthorized'));
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

export const handleDeleteUser: RequestHandler = async (req: any, res, next) => {
  const { id } = req.params;

  if (isValidObjectId(id) === false) {
    return next(createError(400, 'Invalid User ID format'));
  }

  try {
    const user = await User.findById(id);

    if (user === null) {
      return next(createError(404, 'User not found'));
    }

    if (req.user !== user._id.toString()) {
      return next(createError(403, 'Unauthorized'));
    }

    await User.deleteOne({ _id: id });

    return res.status(200).json({ id });
  } catch (error) {
    next(error);
    return null;
  }
};
