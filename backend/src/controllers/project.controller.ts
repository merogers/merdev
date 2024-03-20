import createError from 'http-errors';
import { isValidObjectId } from 'mongoose';

import Project from '../models/project.model';
import { testName, testMessage, testUrl, testTags } from '../util/regex.util';
import type { Request, Response, NextFunction } from 'express';

export const handleLatestProjects = async (_req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const projects = await Project.find().sort({ updatedAt: -1 }).limit(5);

    if (projects.length === 0) {
      throw createError(404, 'No Projects');
    }

    return res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

// const handleUserProjects = asyncHandler(async (req, res) => {
//   const { _id } = req.user;

//   const projects = await Project.find({ userid: _id }).sort({
//     updatedAt: -1,
//   });

//   if (projects) {
//     res.status(200).json(projects);
//   } else {
//     res.status(400);
//     throw new Error('Cannot get projects for that user');
//   }
// });

export const handleProjectDetails = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw createError(400, 'Invalid Project ID format');
  }

  try {
    const project = await Project.findById(id);

    // TODO: Check this
    if (project === null) {
      throw createError(404, 'Cannot find project');
    }

    return res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

export const handleNewProject = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const {
    title,
    description,
    tags,
    codeUrl,
    demoUrl,
    userid,
    screenshot,
  }: {
    title: string;
    description: string;
    tags: string;
    codeUrl: string;
    demoUrl: string;
    userid: string;
    screenshot: string;
  } = req.body;

  if (!isValidObjectId(userid)) {
    throw createError(400, 'Invalid User ID format');
  }

  const validTitle = testName(title);
  const validDescription = testMessage(description);
  const validTags = testTags(tags);
  const validCodeUrl = testUrl(codeUrl);
  const validDemoUrl = testUrl(demoUrl);
  const validScreenshot = testUrl(screenshot);

  // Validate user input
  if (!validTitle || !validDescription || !validTags || !validCodeUrl || !validDemoUrl || !validScreenshot) {
    throw createError(
      400,
      'Invalid Project. Title must be between 1 and 25 characters long, description must be between 1 and 250 characters long, tags must be a comma-separated string, codeUrl, demoUrl and screenshot must be valid urls.',
    );
  }

  try {
    // Split tags string into array
    const tagsArray = tags.split(',');
    tagsArray.map((tag: string) => tag.trim());

    const newProjectData = {
      screenshot,
      userid,
      title,
      description,
      tags: tagsArray,
      codeUrl,
      demoUrl,
    };

    const newProject = await Project.create(newProjectData);
    return res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
};

export const handleUpdateProject = async (req: any, res: Response, next: NextFunction): Promise<any> => {
  const { id } = req.params;
  const user = req.user;
  const {
    title,
    description,
    tags,
    codeUrl,
    demoUrl,
    screenshot,
  }: {
    title: string;
    description: string;
    tags: string;
    codeUrl: string;
    demoUrl: string;
    userid: string;
    screenshot: string;
  } = req.body;

  if (!isValidObjectId(id)) {
    throw createError(400, 'Invalid User ID format');
  }

  const validTitle = testName(title);
  const validDescription = testMessage(description);
  const validTags = testTags(tags);
  const validCodeUrl = testUrl(codeUrl);
  const validDemoUrl = testUrl(demoUrl);
  const validScreenshot = testUrl(screenshot);

  // Validate user input
  if (!validTitle || !validDescription || !validTags || !validCodeUrl || !validDemoUrl || !validScreenshot) {
    throw createError(
      400,
      'Invalid Project. Title must be between 1 and 25 characters long, description must be between 1 and 250 characters long, tags must be a comma-separated string, codeUrl, demoUrl and screenshot must be valid urls.',
    );
  }

  try {
    const project = await Project.findById(id);

    // TODO: Check if this works
    if (project === null) {
      throw createError(404, 'Project not found');
    }

    const projectUserID: string = String(project.userid);

    if (user !== projectUserID) {
      throw createError(403, 'Unauthorized');
    }

    const tagsArray = tags.split(',');

    const updatedProjectBody = {
      codeUrl,
      demoUrl,
      screenshot,
      userid: project.userid,
      title,
      description,
      tags: tagsArray,
    };

    const updatedProject = await Project.findByIdAndUpdate(id, updatedProjectBody, { new: true });

    return res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
};

export const handleDeleteProject = async (req: any, res: Response, next: NextFunction): Promise<any> => {
  const { id } = req.params;
  const user = req.user;

  if (isValidObjectId(id)) {
    next(createError(400, 'Invalid Project ID format'));
    return;
  }

  try {
    const project = await Project.findById(id);

    // TODO: Check if works
    if (project === null) {
      throw createError(404, 'Project not found');
    }

    const projectUserID: string = String(project.userid);

    if (user !== projectUserID) {
      next(createError(403, 'Unauthorized'));
      return;
    }

    await Project.deleteOne({ _id: id });
    return res.status(200).json({ id });
  } catch (error) {
    next(error);
    return null;
  }
};
