import express from 'express';
import swaggerUI from 'swagger-ui-express';

import swaggerSpec from '../config/docs.config';

import authRouter from './auth.routes';
import emailRouter from './email.routes';
import projectRouter from './project.routes';
import userRouter from './user.routes';
import healthRouter from './health.routes';
import imageRouter from './image.routes';

const router = express();

router.use('/auth', authRouter);
router.use('/email', emailRouter);
router.use('/project', projectRouter);
router.use('/user', userRouter);
router.use('/health', healthRouter);
router.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
router.use('/image', imageRouter);

export default router;
