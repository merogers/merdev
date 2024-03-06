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

/**
 * @swagger
 * /api/v1/project:
 *   get:
 *     summary: Gets latest projects
 *     tags:
 *       - project
 *     description: Latest 5 projects
 *   post:
 *     summary: Create new project
 *     tags:
 *       - project
 *     description: Creates new project
 */
router.route('/').get(handleLatestProjects).post(handleNewProject);

/**
 * @swagger
 * /api/v1/project/:id:
 *   get:
 *     summary: Get single project
 *     tags:
 *       - project
 *     description: Get single project
 *   patch:
 *     summary: Update project
 *     tags:
 *       - project
 *     description: Update project
 *   delete:
 *     summary: Delete project
 *     tags:
 *      - project
 *     description: Delete project
 */
router.route('/:id').get(handleProjectDetails).patch(handleUpdateProject).delete(handleDeleteProject);

module.exports = router;
