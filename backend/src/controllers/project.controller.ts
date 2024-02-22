import type { Response, NextFunction, RequestHandler } from 'express';

import Project from '../models/project.model';
import createError from 'http-errors';
import ObjectIdSchema from '../models/object.model';
import type { TokenRequest } from '../middleware/jwt.middleware';

const handleAllProjects: RequestHandler = async (_req, res, next) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

export const handleUserProjects = async (req: TokenRequest, res: Response, next: NextFunction) => {
  if (req.user === null) {
    next(createError(401, 'No User'));
    return;
  }

  try {
    const validID = ObjectIdSchema.safeParse(req.user);

    if (!validID.success) {
      next(createError(400, validID.error.flatten()));
    }

    const projects = await Project.find({ userid: req.user });
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

export const handleCreateProject = async (req: TokenRequest, res: Response, next: NextFunction) => {
  if (req.user === null) {
    next(createError(401, 'No User'));
    return;
  }

  try {
    const validID = ObjectIdSchema.safeParse(req.user);

    if (!validID.success) {
      next(createError(400, validID.error.flatten()));
    }

    // Convert comma-separated string into array, trim spaces
    const tagArray = req.body.tags.split(',').map((tag: string) => tag.trim());

    const newProject = new Project({
      screenshot: req.body.screenshot,
      title: req.body.title,
      tags: tagArray,
      description: req.body.description,
      demoUrl: req.body.demoUrl,
      codeUrl: req.body.codeUrl,
    });

    await newProject.save();

    // Return new project as object
    res.status(200).json({ project: newProject.toObject() });
  } catch (error) {
    next(error);
  }
};

export const handleUpdateProject = async (req: TokenRequest, res: Response, next: NextFunction) => {
  if (req.user === null) {
    next(createError(401, 'No User'));
  }
  try {
    const validID = ObjectIdSchema.safeParse(req.params.id);

    if (!validID.success) {
      next(createError(400, validID.error.flatten()));
    }

    const projectExists = await Project.findById(req.params.id);
    if (projectExists === null) {
      next(createError(404, 'Project not found'));
    }
    if (projectExists!.userid !== req.user) {
      next(createError(401, 'Not authorized to update project'));
    }

    // Convert comma-separated string into array, trim spaces
    const tagArray = req.body.tags.split(',').map((tag: string) => tag.trim());

    // Update only when project exists and current user is owner
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        screenshot: req.body.screenshot,
        title: req.body.title,
        tags: tagArray,
        description: req.body.description,
        demoUrl: req.body.demoUrl,
        codeUrl: req.body.codeUrl,
      },
      { new: true },
    );

    res.status(200).json({ updatedProject });
  } catch (error) {
    next(error);
  }
};

export const handleDeleteProject = async (req: TokenRequest, res: Response, next: NextFunction) => {
  if (req.user === null) {
    next(createError(401, 'No User'));
  }
  try {
    const validID = ObjectIdSchema.safeParse(req.params.id);

    if (!validID.success) {
      next(createError(400, validID.error.flatten()));
    }
    const projectExists = await Project.findOne({ _id: req.params.id });
    if (projectExists === null) {
      next(createError(404, 'Project not found'));
    }

    if (projectExists!.userid !== req.user) {
      next(createError(403, 'Not authorized to delete project'));
    }
    await Project.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const handleReadProject = async (req: TokenRequest, res: Response, next: NextFunction) => {
  if (req.user === null) {
    next(createError(401, 'No User'));
  }
  try {
    const validID = ObjectIdSchema.safeParse(req.params.id);

    if (!validID.success) {
      next(createError(400, validID.error.flatten()));
    }

    const projectExists = await Project.findById(req.params.id);
    if (projectExists === null) {
      next(createError(404, 'Project not found'));
    }

    if (projectExists!.userid !== req.user) {
      next(createError(403, 'Not authorized to read project'));
    }
    res.status(200).json({ project: projectExists });
  } catch (error) {
    next(error);
  }
};

export default handleAllProjects;
