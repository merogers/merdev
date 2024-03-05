require('dotenv').config();
require('./config/db.config').connectDB();

const express = require('express');
const cors = require('cors');

const app = express();

const authRouter = require('./routes/auth.router');
const emailRouter = require('./routes/email.router');
const projectRouter = require('./routes/project.router');
const userRouter = require('./routes/user.router');
const healthRouter = require('./routes/health.router');

const { logger } = require('./util/logger.util');

const port = process.env.PORT || 5000;

const { handleErrors } = require('./middleware/error.middleware');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/email', emailRouter);
app.use('/api/v1/project', projectRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/health', healthRouter);

// Error Handler
app.use(handleErrors);

// 404
app.use('*', (_req, res) => res.sendStatus(404));

// Hey, Listen!
app.listen(port, () => {
  logger.info(`Server listening on port: ${port}...`);
});
