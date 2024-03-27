import createError from 'http-errors';
import { isValidObjectId } from 'mongoose';

import Project from '../models/project.model';

import type { Request, Response, NextFunction } from 'express';
import type { ProjectBody, ResponseType } from '../express';

export const handleLatestProjects = async (_req: Request, res: Response, next: NextFunction): ResponseType => {
  try {
    // Get latest 5 projects, sort by latest update
    const projects = await Project.find().sort({ updatedAt: -1 }).limit(5);
    if (projects.length === 0) throw createError(404, 'No Projects');

    return res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

export const handleProjectDetails = async (req: Request, res: Response, next: NextFunction): ResponseType => {
  const { id } = req.params;

  try {
    // Check if id supplied is a valid MongoDB ID
    if (!isValidObjectId(id)) throw createError(400, 'Invalid Project ID format');

    // Get project details
    const project = await Project.findById(id);
    if (project === null) throw createError(404, 'Cannot find project');

    return res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

export const handleNewProject = async (req: Request, res: Response, next: NextFunction): ResponseType => {
  const { title, description, tags, codeUrl, demoUrl, userid, screenshot }: ProjectBody = req.body;

  try {
    // Check if id supplied is a valid MongoDB ID
    if (!isValidObjectId(userid)) throw createError(400, 'Invalid User ID format');

    // Split tags string into array, trim whitespace
    const tagsArray = tags.split(',');
    tagsArray.map((tag: string) => tag.trim());

    // Create new project
    const newProject = await Project.create({
      screenshot,
      userid,
      title,
      description,
      tags: tagsArray,
      codeUrl,
      demoUrl,
    });

    return res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
};

export const handleUpdateProject = async (req: any, res: Response, next: NextFunction): ResponseType => {
  const { id } = req.params;
  const user = req.user;
  const { title, description, tags, codeUrl, demoUrl, screenshot }: ProjectBody = req.body;

  try {
    // Check if id supplied is a valid MongoDB ID
    if (!isValidObjectId(id)) throw createError(400, 'Invalid User ID format');

    // Check if project exists
    const project = await Project.findById(id);
    if (project === null) throw createError(404, 'Project not found');

    // Check if request user is owner
    if (user !== String(project.userid)) throw createError(403, 'Unauthorized');

    // Split tags string into array
    const tagsArray = tags.split(',');

    // Update project, and return new values
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        codeUrl,
        demoUrl,
        screenshot,
        userid: project.userid,
        title,
        description,
        tags: tagsArray,
      },
      { new: true },
    );

    return res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
};

export const handleDeleteProject = async (req: any, res: Response, next: NextFunction): ResponseType => {
  const { id } = req.params;
  const user = req.user;

  try {
    // Check if id supplied is a valid MongoDB ID
    if (isValidObjectId(id)) throw createError(400, 'Invalid Project ID format');

    // Check if project exists
    const project = await Project.findById(id);
    if (project === null) throw createError(404, 'Project not found');

    // Check if request user is owner
    if (user !== String(project.userid)) throw createError(403, 'Unauthorized');

    // Delete project
    await Project.deleteOne({ _id: id });

    return res.status(200).json({ id });
  } catch (error) {
    next(error);
    return null;
  }
};
