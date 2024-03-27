import createError from 'http-errors';

import type { Request, Response, NextFunction } from 'express';
import type { ProjectBody, ResponseType } from '../express';

import prisma from '../config/db.config';

export const handleLatestProjects = async (_req: Request, res: Response, next: NextFunction): ResponseType => {
  try {
    // Get latest 5 projects, sort by latest update
    const projects = await prisma.project.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
      take: 5,
    });
    if (projects.length === 0) throw createError(404, 'No Projects');

    return res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

export const handleProjectDetails = async (req: any, res: Response, next: NextFunction): ResponseType => {
  const { id } = req.params;

  try {
    // Get project details
    const project = await prisma.project.findUnique({ where: { id } });
    if (project === null) throw createError(404, 'Cannot find project');

    return res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

export const handleNewProject = async (req: Request, res: Response, next: NextFunction): ResponseType => {
  const { title, description, tags, codeUrl, demoUrl, userId, screenshot }: ProjectBody = req.body;

  try {
    // Split tags string into array, trim whitespace
    const tagsArray = tags.split(',');
    tagsArray.map((tag: string) => tag.trim());

    const newProject = await prisma.project.create({
      data: {
        screenshot,
        userId,
        title,
        description,
        tags: tagsArray,
        codeUrl,
        demoUrl,
      },
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
    // Check if project exists
    const project = await prisma.project.findUnique({ where: { id } });
    if (project === null) throw createError(404, 'Project not found');

    // Check if request user is owner
    if (user !== String(project.userId)) throw createError(403, 'Unauthorized');

    // Split tags string into array
    const tagsArray = tags.split(',');

    // Update project, and return new values
    const updateProject = await prisma.project.update({
      where: { id },
      data: {
        codeUrl,
        demoUrl,
        screenshot,
        userId: project.userId,
        title,
        description,
        tags: tagsArray,
      },
    });

    return res.status(200).json(updateProject);
  } catch (error) {
    next(error);
  }
};

export const handleDeleteProject = async (req: any, res: Response, next: NextFunction): ResponseType => {
  const { id } = req.params;
  const user = req.user;

  try {
    // Check if project exists
    const project = await prisma.project.findUnique({ where: { id } });
    if (project === null) throw createError(404, 'Project not found');

    // Check if request user is owner
    if (user !== String(project.userId)) throw createError(403, 'Unauthorized');

    // Delete project
    await prisma.project.delete({ where: { id } });

    return res.status(200).json({ id });
  } catch (error) {
    next(error);
    return null;
  }
};
