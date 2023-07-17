import express from 'express';
import multer from '../middleware/image';
import isAuthenticated from '../middleware/auth';

import getProjects, {
  postNewProject,
  getProjectDetails,
  deleteProjectById,
  patchUpdateProject,
} from '../controllers/project';

const router = express.Router();

router.route('/').get(getProjects).post(isAuthenticated, multer.single('screenshot'), postNewProject);
router
  .route('/:id')
  .get(isAuthenticated, getProjectDetails)
  .patch(isAuthenticated, patchUpdateProject)
  .delete(isAuthenticated, deleteProjectById);

export default router;
