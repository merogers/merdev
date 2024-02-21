import express from 'express';
import handleUserProjects from '../controllers/project.controller';
import verifyJWT from '../middleware/jwt.middleware';

const router = express.Router();

router.route('/').get(verifyJWT, handleUserProjects);

export default router;
