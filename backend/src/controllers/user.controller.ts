import type { Request, Response, NextFunction } from 'express';
import User, { CreateUserInputSchema } from '../models/user.model';
import ObjectIdSchema from '../models/object.model';
import { hashString, randomString } from '../util/crypto';
import createError from 'http-errors';

const createUserHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // User Input Validation
    CreateUserInputSchema.parse(req.body);

    // Check if user already is registered
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists !== null) {
      next(createError(400, 'User already exists'));
      return;
    }

    // Create new User
    const salt = randomString();
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashString(salt, req.body.password),
      salt,
      authorizationToken: '',
      refreshToken: '',
    });
    await newUser.save();

    // Return Response
    res.status(201).json({
      newUser: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const readUserHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Validate Object ID
    ObjectIdSchema.parse(req.params);

    // Check if user exists, else return 404
    const userExists = await User.findOne({ _id: req.params.id });
    if (userExists === null) {
      next(createError(404, 'User not found'));
      return;
    }

    // Return basic user data
    res.status(200).json({
      user: {
        firstName: userExists.firstName,
        lastName: userExists.lastName,
        email: userExists.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const readAllUsersHandler = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get all users, basic data only
    const users = await User.find().select(['-password', '-salt', '-authorizationToken', '-refreshToken']);

    // Return 404 if no users
    if (users === null) {
      next(createError(404, 'No Users found'));
      return;
    }

    // Return users
    res.status(200).json({
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Validate Object ID
    ObjectIdSchema.parse(req.params);

    // Check if user exists, else return 404
    const userExists = await User.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });
    if (userExists === null) {
      next(createError(404, 'User not found'));
      return;
    }

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const deleteUserHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Validate Object ID
    ObjectIdSchema.parse(req.params);

    // Check if user exists, else return 404
    const userExists = await User.findOne({ _id: req.params.id });
    if (userExists === null) {
      next(createError(404, 'User not found'));
      return;
    }

    // Delete user
    await User.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export default createUserHandler;
