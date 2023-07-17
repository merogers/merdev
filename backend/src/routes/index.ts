import express from 'express';
import authRouter from './auth';
import userRouter from './user';
import emailRouter from './email';
import projectRouter from './project';
import isAuthenticated from '../middleware/auth';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/email', emailRouter);
router.use('/user', isAuthenticated, userRouter);
router.use('/project', projectRouter);

export default router;
