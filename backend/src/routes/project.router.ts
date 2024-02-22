import express from 'express';
import handleAllProjects, {
  handleUserProjects,
  handleCreateProject,
  handleDeleteProject,
  handleUpdateProject,
} from '../controllers/project.controller';
import verifyJWT from '../middleware/jwt.middleware';

const router = express.Router();

router.route('/').get(handleAllProjects);

router.route('/user/').get(verifyJWT, handleUserProjects).post(verifyJWT, handleCreateProject);

router
  .route('/user/:id')
  .get(verifyJWT, handleUserProjects)
  .patch(verifyJWT, handleUpdateProject)
  .delete(verifyJWT, handleDeleteProject);

export default router;
