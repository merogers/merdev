import express from 'express';
const router = express.Router();

import healthRouter from './health.router';
import userRouter from './user.router';
import authRouter from './auth.router';
import docRouter from './docs.router';
import projectRouter from './project.router';
import imageRouter from './image.router';
import emailRouter from './email.router';

// Routes
router.use('/auth', authRouter);
router.use('/health', healthRouter);
router.use('/users', userRouter);
router.use('/docs', docRouter);
router.use('/projects', projectRouter);
router.use('/images', imageRouter);
router.use('/email', emailRouter);

export default router;
