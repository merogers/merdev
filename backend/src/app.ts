import express from 'express';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from './config/env.config';
import connectDB from './config/db.config';
import errorHandler, { notFoundHandler } from './middleware/error.middleware';
import indexRouter from './routes/index.router';

// Connect to DB
connectDB();

const app = express();

// Middleware
if (env.NODE_ENV !== 'production') app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(helmet());

// v1 Routes
app.use('/api/v1/', indexRouter);

// 404 Handler
app.use('*', notFoundHandler);

// Error Handler
app.use(errorHandler);

export default app;
