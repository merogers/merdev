import crypto from 'crypto';
import { RequestHandler, Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { Storage } from '@google-cloud/storage';
import jwt from 'jsonwebtoken';
import Project from '../models/project';
import User from '../models/user';

interface FileType extends File {
  originalname: string;
  buffer: unknown;
}

interface ProjectRequest extends Request {
  file: FileType;
}

const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.KEYFILE_NAME,
});
const bucket = storage.bucket(process.env.BUCKET);

const getProjects: RequestHandler = async (req, res, next) => {
  const authorizationToken = req.headers.authorization;

  try {
    // If bad or no token, just send latest projects
    if (!authorizationToken) {
      const latestProjects = await Project.find().sort({ updatedAt: -1 }).limit(5);
      return res.status(200).json(latestProjects);
    }

    const decoded = jwt.verify(authorizationToken, process.env.JWT_SECRET);

    // Quick check for user
    const userExists = await User.findById(decoded.id);
    if (!userExists) return next(createError(404, 'User not found'));

    const projects = await Project.find({ userid: decoded.id }).sort({
      updatedAt: -1,
    });
    return res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    return next(createError(500, 'Cannot get projects'));
  }
};

export const getProjectDetails: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const project = await Project.findOne({ _id: id });
    return res.status(200).json(project);
  } catch (error) {
    return next(createError(500, 'Cannot get project details'));
  }
};

export const postNewProject = async (req: ProjectRequest, res: Response, next: NextFunction) => {
  const { title, description, tags, codeUrl, demoUrl } = req.body;

  const authorizationToken = req.headers.authorization;
  const decoded = jwt.verify(authorizationToken, process.env.JWT_SECRET);

  // Abort if no project details
  if (!title || !description || !tags || !codeUrl || !demoUrl) {
    return next(createError(400, 'Error creating project: missing fields'));
  }

  // Abort if no screenshot file submitted
  if (!req.file) {
    return next(createError(400, 'Error creating project: no screenshot file found'));
  }

  try {
    // Split tags string into array
    const tagsArray: string[] = tags.split(',');
    tagsArray.map(tag => tag.trim());

    // Get original file extension, and append it to unique filename
    const fileName = req.file.originalname.split('.');
    const newFileName = `${crypto.randomBytes(12).toString('hex')}.${fileName[1]}`;

    // Define GCP Storage Bucket Details
    const blob = bucket.file(newFileName);
    const blobStream = blob.createWriteStream();

    const newProject = new Project({
      screenshotUrl: process.env.STORAGE_URL + blob.id,
      screenshotFile: newFileName,
      userid: decoded.id,
      title,
      description,
      tags: tagsArray,
      codeUrl,
      demoUrl,
    });

    // If screenshot upload fails, then exit
    blobStream.on('error', () => next(createError(400, 'Error uploading image to GCP Storage')));

    // When finished writing image file, create DB project and return
    blobStream.on('finish', async () => {
      await newProject.save();
    });

    blobStream.end(req.file.buffer);

    return res.status(201).json({ message: 'Success' });
  } catch (error) {
    return next(createError(500, 'Could not create project'));
  }
};

export const patchUpdateProject: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const { screenshotUrl, title, description, tags, codeUrl, demoUrl } = req.body;

  if (!id || !screenshotUrl || !title || !description || !tags) {
    res.status(400);
    throw new Error('Error updating project: missing fields');
  }

  try {
    const project = await Project.findById({ _id: id });
    const tagsArray = tags.split(',');
    const updatedProjectBody = {
      _id: id,
      codeUrl,
      demoUrl,
      screenshotUrl,
      userid: project.userid,
      title,
      description,
      tags: tagsArray,
    };

    await Project.findByIdAndUpdate({ _id: id }, updatedProjectBody);
    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    return next(createError(500, 'Cannot update project'));
  }
};

export const deleteProjectById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById({ _id: id });

  if (!project) {
    return next(createError(404, 'Project not found'));
  }

  try {
    await Project.deleteOne({ _id: id });
    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    return next(createError(500, 'Cannot delete project'));
  }
};

export default getProjects;
