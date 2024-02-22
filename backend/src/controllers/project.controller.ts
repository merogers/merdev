import type { Request, Response, NextFunction, RequestHandler } from 'express';

import Project from '../models/project.model';
import createError from 'http-errors';
import ObjectIdSchema from '../models/object.model';
import type { TokenRequest } from '../middleware/jwt.middleware';

const handleUserProjects = async (req: TokenRequest, res: Response, next: NextFunction) => {
  if (req.user === null) {
    next(createError(403, 'No User'));
    return;
  }

  try {
    ObjectIdSchema.parse(req.user);

    const projects = await Project.find({ userid: req.user });
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

export const handleUpdateProject = async (req: TokenRequest, res: Response, next: NextFunction) => {
  if (req.user === null) {
    next(createError(403, 'No User'));
  }
  try {
    ObjectIdSchema.parse(req.params);

    const projectExists = await Project.findOne({ _id: req.params.id });

    if (projectExists === null) {
      next(createError(404, 'Project not found'));
    }

    if (projectExists?.userid !== req.user) {
      next(createError(401, 'Not authorized to delete project'));
    }

    await Project.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const handleDeleteProject = async (req: TokenRequest, res: Response, next: NextFunction) => {
  if (req.user === null) {
    next(createError(403, 'No User'));
  }
  try {
    ObjectIdSchema.parse(req.params);
    const projectExists = await Project.findOne({ _id: req.params.id });
    if (projectExists === null) {
      next(createError(404, 'Project not found'));
    }

    if (projectExists?.userid !== req.user) {
      next(createError(401, 'Not authorized to delete project'));
    }
    await Project.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export default handleUserProjects;
