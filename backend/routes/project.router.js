const express = require('express');

const router = express.Router();

const { handleProtectRoute } = require('../middleware/auth.middleware');
const { handleImage } = require('../middleware/image.middleware');

const {
  handleNewProject,
  handleLatestProjects,
  handleDeleteProject,
  handleProjectDetails,
  handleUpdateProject,
} = require('../controllers/project.controller');

router
  .route('/')
  .get(handleLatestProjects)
  .post(handleProtectRoute, handleImage.single('screenshot'), handleNewProject);

router
  .route('/:id')
  .get(handleProjectDetails)
  .patch(handleProtectRoute, handleUpdateProject)
  .delete(handleProtectRoute, handleDeleteProject);

module.exports = router;
