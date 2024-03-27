import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import indexRoutes from './routes/index.routes';
import handleErrors from './middleware/error.middleware';

const app = express();

// Middleware
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API v1 Routes
app.use(`/v1`, indexRoutes);

// Error Handler
app.use(handleErrors);

// 404
app.use('*', (_req, res) => res.sendStatus(404));

export default app;
