import express from 'express';
import authRouter from './auth';
import userRouter from './user';
import emailRouter from './email';
// import projectRouter from './project';
import imageRouter from './image';
import verifyJWT from '../middleware/verifyJWT';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/email', emailRouter);
router.use('/image', imageRouter);
router.use('/user', verifyJWT, userRouter);
// router.use('/project', projectRouter);

export default router;
