import bcrypt from 'bcrypt';
import createError from 'http-errors';
import type { Request, Response, NextFunction } from 'express';

import type { ResponseType, UserBody } from '../express';

import prisma from '../config/db.config';

export const handleCreateUser = async (req: Request, res: Response, next: NextFunction): ResponseType => {
  const { email, password, firstName, lastName }: UserBody = req.body;

  try {
    // Check if user exists
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userExists !== null) throw createError(400, 'User already exists');

    // Create hash of password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user, and return without password
    const newUser = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const handleUserDetails = async (req: any, res: Response, next: NextFunction): ResponseType => {
  const { id } = req.params;
  const user = req.user;

  try {
    // Check if user exists
    const userExists = await prisma.user.findUnique({ where: { id } });
    if (userExists === null) throw createError(404, 'User not found');

    // Check whether requesting user is owner
    if (user !== String(userExists.id)) throw createError(403, 'Unauthorized');

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const handleUpdateUser = async (req: any, res: Response, next: NextFunction): ResponseType => {
  const { id } = req.params;
  const { firstName, lastName, email, password }: UserBody = req.body;

  try {
    // Check if user exists
    const userExists = await prisma.user.findUnique({ where: { id } });
    if (userExists === null) throw createError(404, 'User not found');

    // Check whether requesting user is owner
    if (req.user !== userExists.id) throw createError(403, 'Unauthorized');

    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
        email,
        password,
      },
    });

    return res.status(200).json({
      user: {
        firstName: updateUser.firstName,
        lastName: updateUser.lastName,
        email: updateUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const handleDeleteUser = async (req: any, res: Response, next: NextFunction): ResponseType => {
  const { id } = req.params;
  const user = req.user;

  try {
    // Check if user exists
    const userExists = await prisma.user.findUnique({ where: { id } });
    if (userExists === null) throw createError(404, 'User not found');

    // Check whether requesting user is owner
    if (user !== String(userExists.id)) throw createError(403, 'Unauthorized');

    // Delete user
    await prisma.user.delete({
      where: { id },
    });

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
