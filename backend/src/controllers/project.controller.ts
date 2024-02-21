import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '../config/env.config';
import { hashString } from '../util/crypto';
import Project from '../models/project.model';
import createError from 'http-errors';
import ObjectIdSchema from '../models/object.model';
import type { TokenRequest } from '../middleware/jwt.middleware';

const handleUserProjects = async (req: TokenRequest, res: Response, next: NextFunction) => {
  console.log('user:', req.user);
  if (req.user === null) {
    return next(createError(403, 'No User'));
  }

  try {
    ObjectIdSchema.parse(req.user);

    const projects = await Project.find({ userid: req.user });
    res.status(200).json(projects);
  } catch (error) {
    return next(error);
  }

  // try {
  //   ObjectIdSchema.parse(req.user);

  //   const projects = await Project.find({ userid: req.user });

  //   console.log('Projects:', projects);

  //   res.status(200).json(projects);
  // } catch (error) {
  //   next(error);
  // }
};

export default handleUserProjects;
