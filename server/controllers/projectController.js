const asyncHandler = require('express-async-handler');

const Project = require('../models/projectModel');
const User = require('../models/userModel');

const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.KEYFILE_NAME,
});
const bucket = storage.bucket(process.env.BUCKET);

const getLatestProjects = asyncHandler(async (_req, res) => {
  const projects = await Project.find().sort({ updatedAt: -1 }).limit(5);

  if (projects) {
    res.status(200).json(projects);
  } else {
    res.status(500);
    throw new Error('Cannot get projects');
  }
});

const getUserProjects = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const projects = await Project.find({ user: id }).sort({
    updatedAt: -1,
  });

  if (projects) {
    res.status(200).json(projects);
  } else {
    res.status(400);
    throw new Error('Cannot get projects for that user');
  }
});

const getProjectDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const project = await Project.findOne({ _id: id });

  if (project) {
    res.status(200).json(project);
  } else {
    res.status(400);
    throw new Error('No project with that ID exists');
  }
});

const postNewProject = asyncHandler(async (req, res) => {
  const { title, description, tags, codeUrl, demoUrl } = req.body;

  // Abort if no project details
  if (!title || !description || !tags || !codeUrl || !demoUrl) {
    res.status(400);
    throw new Error('Error creating project: missing fields');
  }

  // Abort if no screenshot file submitted
  if (!req.file) {
    res.status(400);
    throw new Error('Error creating project: no screenshot file found');
  }

  // Split tags string into array
  const tagsArray = tags.split(' ');

  // Define GCP Storage Bucket Details
  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream();

  const newProject = {
    screenshotUrl: process.env.STORAGE_URL + blob.id,
    userid: req.user.id,
    title,
    description,
    tags: tagsArray,
    codeUrl,
    demoUrl,
  };

  const project = await Project.create(newProject);

  // If Error, return message.
  blobStream.on('error', () => {
    res.status(500);
    throw new Error('Error uploading image to GCP Storage');
  });

  // When finished writing image file, create DB project
  blobStream.on('finish', () => {
    if (project) {
      res.status(201).json(project);
    } else {
      res.status(400);
      throw new Error('Error creating project');
    }
  });

  blobStream.end(req.file.buffer);
});

const putUpdateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { screenshotUrl, title, description, tags } = req.body;

  if (!id || !screenshotUrl || !title || !description || !tags) {
    res.status(400);
    throw new Error('Error updating project: missing fields');
  }

  const project = await Project.findById({ _id: id });

  if (!req.user) {
    res.status(401);
    throw new Error('Unauthorized: No user found');
  }

  if (project.userid.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Unauthorized: No permissions on this resource');
  }

  const tagsArray = tags.split(' ');

  const updatedProjectBody = {
    screenshotUrl,
    user,
    title,
    description,
    tags: tagsArray,
  };

  const updatedProject = await Project.findOneAndUpdate(
    { id },
    updatedProjectBody
  );

  if (updatedProject) {
    // Send back updated project
    const project = await Project.findById({ _id: id });
    res.status(200).json(project);
  } else {
    res.status(400);
    throw new Error('Error updating project');
  }
});

const deleteProjectById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById({ _id: id });

  if (!req.user) {
    res.status(401);
    throw new Error('Unauthorized: No user found');
  }

  if (!project) {
    res.status(401);
    throw new Error('Unauthorized: Invalid Project');
  }

  if (project.userid.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Unauthorized: No permissions on this resource');
  }

  const deleteProject = await Project.deleteOne({ _id: id });

  if (deleteProject) {
    res.status(200).json({ message: 'Project deleted successfully' });
  } else {
    res.status(400);
    throw new Error('Project deletion failed');
  }
});

module.exports = {
  postNewProject,
  getLatestProjects,
  getProjectDetails,
  getUserProjects,
  deleteProjectById,
  putUpdateProject,
};
