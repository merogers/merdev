import express from 'express';
import handleUserProjects, { handleDeleteProject, handleUpdateProject } from '../controllers/project.controller';
import verifyJWT from '../middleware/jwt.middleware';

const router = express.Router();

router.route('/').get(verifyJWT, handleUserProjects);
router.route('/:id').put(verifyJWT, handleUpdateProject).delete(verifyJWT, handleDeleteProject);

export default router;
