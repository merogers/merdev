import createError from 'http-errors';
import { isValidObjectId } from 'mongoose';

import Project from '../models/project.model.js';
import { testName, testMessage, testUrl, testTags } from '../util/regex.util.js';

export const handleLatestProjects = async (_req, res, next) => {
  try {
    const projects = await Project.find().sort({ updatedAt: -1 }).limit(5);

    if (!projects) {
      return next(createError(404, 'No Projects'));
    }

    return res.status(200).json(projects);
  } catch (error) {
    next(error);
    return null;
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

export const handleProjectDetails = async (req, res, next) => {
  const { id } = req.params;

  if (isValidObjectId(id) === false) {
    return next(createError(400, 'Invalid Project ID format'));
  }

  try {
    const project = await Project.findById(id);

    if (!project) {
      return next(createError(404, 'Cannot find project'));
    }

    return res.status(200).json(project);
  } catch (error) {
    next(error);
    return null;
  }
};

export const handleNewProject = async (req, res, next) => {
  const { title, description, tags, codeUrl, demoUrl, userid, screenshot } = req.body;

  if (isValidObjectId(userid) === false) {
    return next(createError(400, 'Invalid User ID format'));
  }

  const validTitle = testName(title);
  const validDescription = testMessage(description);
  const validTags = testTags(tags);
  const validCodeUrl = testUrl(codeUrl);
  const validDemoUrl = testUrl(demoUrl);
  const validScreenshot = testUrl(screenshot);

  // Validate user input
  if (
    validTitle === false ||
    validDescription === false ||
    validTags === false ||
    validCodeUrl === false ||
    validDemoUrl === false ||
    validScreenshot === false
  ) {
    return next(
      createError(
        400,
        'Invalid Project. Title must be between 1 and 25 characters long, description must be between 1 and 250 characters long, tags must be a comma-separated string, codeUrl, demoUrl and screenshot must be valid urls.',
      ),
    );
  }

  try {
    // Split tags string into array
    const tagsArray = tags.split(',');
    tagsArray.map((tag) => tag.trim());

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
    return null;
  }
};

export const handleUpdateProject = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, tags, codeUrl, demoUrl, screenshot } = req.body;

  if (isValidObjectId(id) === false) {
    return next(createError(400, 'Invalid User ID format'));
  }

  const validTitle = testName(title);
  const validDescription = testMessage(description);
  const validTags = testTags(tags);
  const validCodeUrl = testUrl(codeUrl);
  const validDemoUrl = testUrl(demoUrl);
  const validScreenshot = testUrl(screenshot);

  // Validate user input
  if (
    validTitle === false ||
    validDescription === false ||
    validTags === false ||
    validCodeUrl === false ||
    validDemoUrl === false ||
    validScreenshot === false
  ) {
    return next(
      createError(
        400,
        'Invalid Project. Title must be between 1 and 25 characters long, description must be between 1 and 250 characters long, tags must be a comma-separated string, codeUrl, demoUrl and screenshot must be valid urls.',
      ),
    );
  }

  try {
    const project = await Project.findById(id);

    if (!project) {
      return next(createError(404, 'Project not found'));
    }

    if (req.user !== project.userid) {
      return next(createError(403, 'Unauthorized'));
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
    return null;
  }
};

export const handleDeleteProject = async (req, res, next) => {
  const { id } = req.params;

  if (isValidObjectId(id) === false) {
    return next(createError(400, 'Invalid Project ID format'));
  }

  try {
    const project = await Project.findById(id);

    if (!project) {
      return next(createError(404, 'Project not found'));
    }

    if (req.user !== project.userid) {
      return next(createError(403, 'Unauthorized'));
    }

    await Project.deleteOne({ _id: id });
    return res.status(200).json({ id });
  } catch (error) {
    next(error);
    return null;
  }
};
