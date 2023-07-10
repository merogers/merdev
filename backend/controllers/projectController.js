const asyncHandler = require("express-async-handler");
const crypto = require("crypto");

const { Storage } = require("@google-cloud/storage");
const Project = require("../models/projectModel");

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
    throw new Error("Cannot get projects");
  }
});

const getUserProjects = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const projects = await Project.find({ userid: _id }).sort({
    updatedAt: -1,
  });

  if (projects) {
    res.status(200).json(projects);
  } else {
    res.status(400);
    throw new Error("Cannot get projects for that user");
  }
});

const getProjectDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const project = await Project.findOne({ _id: id });

  if (project) {
    res.status(200).json(project);
  } else {
    res.status(400);
    throw new Error("No project with that ID exists");
  }
});

const postNewProject = asyncHandler(async (req, res) => {
  const { title, description, tags, codeUrl, demoUrl } = req.body;

  // Abort if no project details
  if (!title || !description || !tags || !codeUrl || !demoUrl) {
    res.status(400);
    throw new Error("Error creating project: missing fields");
  }

  // Abort if no screenshot file submitted
  if (!req.file) {
    res.status(400);
    throw new Error("Error creating project: no screenshot file found");
  }

  // Split tags string into array
  const tagsArray = tags.split(",");
  tagsArray.map((tag) => tag.trim());

  // Get original file extension, and append it to unique filename
  const fileName = req.file.originalname.split(".");
  const newFileName = `${crypto.randomBytes(12).toString("hex")}.${fileName[1]}`;

  // Define GCP Storage Bucket Details
  const blob = bucket.file(newFileName);
  const blobStream = blob.createWriteStream();

  const newProject = {
    screenshotUrl: process.env.STORAGE_URL + blob.id,
    screenshotFile: newFileName,
    userid: req.user.id,
    title,
    description,
    tags: tagsArray,
    codeUrl,
    demoUrl,
  };

  const project = await Project.create(newProject);

  // If Error, return message.
  blobStream.on("error", () => {
    res.status(500);
    throw new Error("Error uploading image to GCP Storage");
  });

  // When finished writing image file, create DB project
  blobStream.on("finish", () => {
    if (project) {
      res.status(201).json(project);
    } else {
      res.status(400);
      throw new Error("Error creating project");
    }
  });

  blobStream.end(req.file.buffer);
});

const putUpdateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { screenshotUrl, title, description, tags, codeUrl, demoUrl, _id } = req.body;

  if (!id || !screenshotUrl || !title || !description || !tags) {
    res.status(400);
    throw new Error("Error updating project: missing fields");
  }

  const project = await Project.findById({ _id: id });

  if (!req.user) {
    res.status(401);
    throw new Error("Unauthorized: No user found");
  }

  const tagsArray = tags.split(",");

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

  const updatedProject = await Project.findByIdAndUpdate({ _id: id }, updatedProjectBody);

  if (updatedProject) {
    const checkProject = await Project.findById({ _id: id });
    res.status(200).json(checkProject);
  } else {
    res.status(400);
    throw new Error("Project update failed");
  }
});

const deleteProjectById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById({ _id: id });

  if (!req.user) {
    res.status(401);
    throw new Error("Unauthorized: No user found");
  }

  if (!project) {
    res.status(401);
    throw new Error("Unauthorized: Invalid Project");
  }

  if (project.userid.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Unauthorized: No permissions on this resource");
  }

  // Delete Project from DB
  const deleteProject = await Project.deleteOne({ _id: id });

  if (deleteProject) {
    // Delete Screenshot from GCP Storage
    const screenshot = bucket.file(project.screenshotFile);
    screenshot.delete();
    // Return ID
    res.status(200).json({ id });
  } else {
    res.status(400);
    throw new Error("Project deletion failed");
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
