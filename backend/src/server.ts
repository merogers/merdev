import 'dotenv/config';
import connectDB from './config/db.config';
import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.routes';
import emailRouter from './routes/email.routes';
import projectRouter from './routes/project.routes';
import userRouter from './routes/user.routes';
import healthRouter from './routes/health.routes';
import imageRouter from './routes/image.routes';

import logger from './util/logger.util';
import swaggerSpec from './config/docs.config';
import handleErrors from './middleware/error.middleware';

const app = express();
const port = process.env.PORT;

// Middleware
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/email', emailRouter);
app.use('/api/v1/project', projectRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/health', healthRouter);
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/api/v1/image', imageRouter);

// Error Handler
app.use(handleErrors);

// 404
app.use('*', (_req, res) => res.sendStatus(404));

// Hey, Listen!
app.listen(port, async () => {
  if (!port) {
    logger.error('No Port Specified');
    process.exit(1);
  }
  await connectDB();
  logger.info(`Server listening on port: ${port}...`);
});
