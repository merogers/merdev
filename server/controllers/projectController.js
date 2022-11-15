const asyncHandler = require('express-async-handler');

const Project = require('../models/projectModel');

// ! Update endpoints in functions

/*

GET   /api/projects         Public
POST  /api/projects         Private
GET   /api/projects/:id     Public
PUT   /api/projects/:id     Private
DEL   /api/projects/:id     Private

*/

// DESC:    Get 5 Latest Projects
// ROUTE:   GET with JSON to /api/projects/
// ACCESS:  Private
const getLatestProjects = asyncHandler(async (_req, res) => {
  const projects = await Project.find().sort({ updatedAt: -1 }).limit(5);

  if (projects) {
    res.status(200).json(projects);
  } else {
    res.status(500);
    throw new Error('Cannot get projects');
  }
});

// DESC:    Get projects by User ID
// ROUTE:   GET with JSON to /api/projects/:userid
// ACCESS:  Private
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

// DESC:    Get project Details by ID
// ROUTE:   GET with JSON to /api/projects/details/:id
// ACCESS:  Private
const getProjectDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const project = await Project.findOne({ id });

  if (project) {
    res.status(200).json(project);
  } else {
    res.status(400);
    throw new Error('No project with that ID exists');
  }
});

// DESC:    Create new Project
// ROUTE:   POST with JSON to /api/projects
// ACCESS:  Private
const postNewProject = asyncHandler(async (req, res) => {
  const { screenshotUrl, user, title, description, tags } = req.body;

  if (!screenshotUrl || !user || !title || !description || !tags) {
    res.status(400);
    throw new Error('Error creating project: missing fields');
  }

  const tagsArray = tags.split(' ');

  const newProject = await Project.create({
    screenshotUrl,
    user,
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

// DESC:    Update existing Project
// ROUTE:   PUT from JSON to /api/projects/details/:projectid
// ACCESS:  Private
const putUpdateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { screenshotUrl, title, description, tags } = req.body;

  if (!id || !screenshotUrl || !title || !description || !tags) {
    res.status(400);
    throw new Error('Error updating project: missing fields');
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  //! Add check so only user can delete their own projects

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
    res.status(200).json(updatedProject);
  } else {
    res.status(400);
    throw new Error('Error updating project');
  }
});

// DESC:    Delete existing Project
// ROUTE:   DELETE with PARAMS to /api/projects/:projectid
// ACCESS:  Private
const deleteProjectById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deleteProject = await Project.deleteOne({ id });

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
