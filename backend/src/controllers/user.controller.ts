import bcrypt from 'bcrypt';
import createError from 'http-errors';
import { isValidObjectId } from 'mongoose';
import type { Request, Response, NextFunction } from 'express';

import User from '../models/user.model';

import type { ResponseType, UserBody } from '../express';

export const handleCreateUser = async (req: Request, res: Response, next: NextFunction): ResponseType => {
  const { email, password, firstName, lastName }: UserBody = req.body;

  try {
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists !== null) throw createError(400, 'User already exists');

    // Create hash of password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user, and return without password
    const newUser = await User.create({ email, password: hashedPassword, firstName, lastName });
    const newUserJson = newUser.toJSON();

    return res.status(201).json(newUserJson);
  } catch (error) {
    next(error);
  }
};

export const handleUserDetails = async (req: any, res: Response, next: NextFunction): ResponseType => {
  const { id } = req.params;
  const user = req.user;

  try {
    // Check if id supplied is a valid MongoDB ID
    if (isValidObjectId(id)) throw createError(400, 'Invalid User ID format');

    // Check if user exists
    const userExists = await User.findById(id).select('-password');
    if (userExists === null) throw createError(404, 'User not found');

    // Check whether requesting user is owner
    if (user !== String(userExists._id)) throw createError(403, 'Unauthorized');

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const handleUpdateUser = async (req: any, res: Response, next: NextFunction): ResponseType => {
  const { id } = req.params;
  const { firstName, lastName, email, password }: UserBody = req.body;

  try {
    // Check if id supplied is a valid MongoDB ID
    if (isValidObjectId(id)) throw createError(400, 'Invalid User ID format');

    // Check if user exists
    const user = await User.findById(id);
    if (user === null) throw createError(404, 'User not found');

    // Check whether requesting user is owner
    if (req.user !== user._id.toString()) throw createError(403, 'Unauthorized');

    // Update user data
    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        firstName,
        lastName,
        email,
        password,
      },
      { new: true },
    ).select('-password');

    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const handleDeleteUser = async (req: any, res: Response, next: NextFunction): ResponseType => {
  const { id } = req.params;
  const user = req.user;

  try {
    // Check if id supplied is a valid MongoDB ID
    if (!isValidObjectId(id)) throw createError(400, 'Invalid User ID format');

    // Check if user exists
    const userExists = await User.findById(id);
    if (userExists === null) throw createError(404, 'User not found');

    // Check whether requesting user is owner
    if (user !== String(userExists._id)) throw createError(403, 'Unauthorized');

    // Delete user
    await User.deleteOne({ _id: id });

    return res.status(200).json({ id });
  } catch (error) {
    next(error);
  }
};
