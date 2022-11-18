const asyncHandler = require('express-async-handler');

const Project = require('../models/projectModel');
const User = require('../models/userModel');

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

  const projects = await Projects.find({ user: id }).sort({
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
  const { screenshotUrl, title, description, tags } = req.body;

  if (!screenshotUrl || !title || !description || !tags) {
    res.status(400);
    throw new Error('Error creating project: missing fields');
  }

  const tagsArray = tags.split(' ');

  const newProject = await Project.create({
    screenshotUrl,
    userid: req.user.id,
    title,
    description,
    tags: tagsArray,
  });

  if (newProject) {
    res.status(201).json(newProject);
  } else {
    res.status(400);
    throw new Error('Error creating project');
  }
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
