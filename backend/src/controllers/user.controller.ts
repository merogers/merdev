import bcrypt from 'bcrypt';
import createError from 'http-errors';
import { isValidObjectId } from 'mongoose';
import type { Request, Response, NextFunction } from 'express';

import User from '../models/user.model';
import { testEmail, testName, testPassword } from '../util/regex.util';

export const handleCreateUser = async (req: Request, res: Response, next: NextFunction) => {
  const {
    email,
    password,
    firstName,
    lastName,
  }: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  } = req.body;

  const validEmail = testEmail(email);
  const validPassword = testPassword(password);
  const validFirstName = testName(firstName);
  const validLastName = testName(lastName);

  // Validate user input
  if (!validEmail || !validPassword || !validFirstName || !validLastName) {
    next(
      createError(
        400,
        'Invalid User. Email must be valid, password must be between 8 and 25 charactgers long, firstName and lastName must be between 1 and 25 characters long with no special characters',
      ),
    );
    return;
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists !== null) {
      next(createError(400, 'User already exists'));
      return;
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

export const handleUserDetails = async (req: any, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const user = req.user;

  if (isValidObjectId(id)) {
    next(createError(400, 'Invalid User ID format'));
    return;
  }

  try {
    const userExists = await User.findById(id).select('-password');

    if (userExists === null) {
      next(createError(404, 'User not found'));
      return;
    }

    const userID = String(userExists._id);

    if (user !== userID) {
      next(createError(403, 'Unauthorized'));
      return;
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
    return null;
  }
};

export const handleUpdateUser = async (req: any, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    email,
    password,
  }: { firstName: string; lastName: string; email: string; password: string } = req.body;

  if (isValidObjectId(id)) {
    next(createError(400, 'Invalid User ID format'));
    return;
  }

  const validEmail = testEmail(email);
  const validPassword = testPassword(password);
  const validFirstName = testName(firstName);
  const validLastName = testName(lastName);

  // Validate user input
  if (!validEmail || !validPassword || !validFirstName || !validLastName) {
    next(
      createError(
        400,
        'Invalid User. Email must be valid, password must be between 8 and 25 charactgers long, firstName and lastName must be between 1 and 25 characters long with no special characters',
      ),
    );
    return;
  }

  try {
    const user = await User.findById(id);

    if (user === null) {
      next(createError(404, 'User not found'));
      return;
    }

    if (req.user !== user._id.toString()) {
      next(createError(403, 'Unauthorized'));
      return;
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

export const handleDeleteUser = async (req: any, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const user = req.user;

  if (!isValidObjectId(id)) {
    next(createError(400, 'Invalid User ID format'));
    return;
  }

  try {
    const userExists = await User.findById(id);

    if (userExists === null) {
      next(createError(404, 'User not found'));
      return;
    }

    const userID = String(userExists._id);

    if (user !== userID) {
      next(createError(403, 'Unauthorized'));
      return;
    }

    await User.deleteOne({ _id: id });

    return res.status(200).json({ id });
  } catch (error) {
    next(error);
    return null;
  }
};
