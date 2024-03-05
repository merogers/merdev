const crypto = require('crypto');

const createError = require('http-errors');

// const { Storage } = require("@google-cloud/storage");
const Project = require('../models/project.model');

// const storage = new Storage({
//   projectId: process.env.PROJECT_ID,
//   keyFilename: process.env.KEYFILE_NAME,
// });
// const bucket = storage.bucket(process.env.BUCKET);

const handleLatestProjects = async (_req, res, next) => {
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

const handleProjectDetails = async (req, res, next) => {
  const { id } = req.params;

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

const handleNewProject = async (req, res, next) => {
  const { title, description, tags, codeUrl, demoUrl } = req.body;

  // Abort if no project details
  if (!title || !description || !tags || !codeUrl || !demoUrl) {
    return next(createError(400, 'Missing fields'));
  }

  try {
    // Split tags string into array
    const tagsArray = tags.split(',');
    tagsArray.map((tag) => tag.trim());

    // Get original file extension, and append it to unique filename
    const fileName = req.file.originalname.split('.');
    const newFileName = `${crypto.randomBytes(12).toString('hex')}.${fileName[1]}`;

    // Define GCP Storage Bucket Details
    // const blob = bucket.file(newFileName);
    // const blobStream = blob.createWriteStream();

    const newProjectData = {
      // screenshotUrl: process.env.STORAGE_URL + blob.id,
      screenshot: newFileName,
      userid: req.user.id,
      title,
      description,
      tags: tagsArray,
      codeUrl,
      demoUrl,
    };

    const newProject = await Project.create(newProjectData);
    const newProjectReturn = newProject.toJson();
    return res.status(201).json(newProjectReturn);
  } catch (error) {
    next(error);
    return null;
  }
};

const handleUpdateProject = async (req, res, next) => {
  const { id } = req.params;
  const { screenshotUrl, title, description, tags, codeUrl, demoUrl, _id } = req.body;

  if (!id || !screenshotUrl || !title || !description || !tags) {
    res.status(400);
    throw new Error('Error updating project: missing fields');
  }

  try {
    const project = await Project.findById({ _id: id });

    if (!project) {
      return next(createError(404, 'Project not found'));
    }

    const tagsArray = tags.split(',');

    const updatedProjectBody = {
      _id,
      codeUrl,
      demoUrl,
      screenshotUrl,
      userid: project.userid,
      title,
      description,
      tags: tagsArray,
    };

    const updatedProject = await Project.findByIdAndUpdate({ _id: id }, updatedProjectBody, { new: true });

    return res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
    return null;
  }
};

const handleDeleteProject = async (req, res, next) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);

    if (!project) {
      return next(createError(404, 'Project not found'));
    }

    await Project.deleteOne({ _id: id });
    return res.status(200).json({ id });
  } catch (error) {
    next(error);
    return null;
  }
};

module.exports = {
  handleDeleteProject,
  handleLatestProjects,
  handleNewProject,
  handleProjectDetails,
  handleUpdateProject,
};
