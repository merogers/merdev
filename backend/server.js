import 'dotenv/config';
import connectDB from './config/db.config.js';
import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';

import authRouter from './routes/auth.routes.js';
import emailRouter from './routes/email.routes.js';
import projectRouter from './routes/project.routes.js';
import userRouter from './routes/user.routes.js';
import healthRouter from './routes/health.routes.js';
import imageRouter from './routes/image.routes.js';

import logger from './util/logger.util.js';
import swaggerSpec from './config/docs.config.js';
import handleErrors from './middleware/error.middleware.js';

connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
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
app.listen(port, () => {
  logger.info(`Server listening on port: ${port}...`);
});
