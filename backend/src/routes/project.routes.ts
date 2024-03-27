import express from 'express';
import {
  handleNewProject,
  handleLatestProjects,
  handleDeleteProject,
  handleProjectDetails,
  handleUpdateProject,
} from '../controllers/project.controller';

import { handleProtectRoute } from '../middleware/auth.middleware';

const router = express.Router();

router.route('/').get(handleLatestProjects).post(handleProtectRoute, handleNewProject);

router
  .route('/:id')
  .get(handleProtectRoute, handleProjectDetails)
  .patch(handleProtectRoute, handleUpdateProject)
  .delete(handleProtectRoute, handleDeleteProject);

export default router;
