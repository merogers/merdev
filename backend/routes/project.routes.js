import express from 'express';
import {
  handleNewProject,
  handleLatestProjects,
  handleDeleteProject,
  handleProjectDetails,
  handleUpdateProject,
} from '../controllers/project.controller.js';

import { handleProtectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

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
router.route('/').get(handleLatestProjects).post(handleProtectRoute, handleNewProject);

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
router
  .route('/:id')
  .get(handleProtectRoute, handleProjectDetails)
  .patch(handleProtectRoute, handleUpdateProject)
  .delete(handleProtectRoute, handleDeleteProject);

export default router;
