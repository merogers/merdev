import express from 'express';
import isAuthenticated from '../middleware/auth';

import getProjects, {
  postNewProject,
  getProjectDetails,
  deleteProjectById,
  patchUpdateProject,
} from '../controllers/project';

const router = express.Router();

router.route('/').get(getProjects).post(isAuthenticated, postNewProject);
router
  .route('/:id')
  .get(isAuthenticated, getProjectDetails)
  .patch(isAuthenticated, patchUpdateProject)
  .delete(isAuthenticated, deleteProjectById);

export default router;
