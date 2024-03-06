require('dotenv').config();
require('./config/db.config').connectDB();

const express = require('express');
const cors = require('cors');

const app = express();

const swaggerUi = require('swagger-ui-express');

const authRouter = require('./routes/auth.routes');
const emailRouter = require('./routes/email.routes');
const projectRouter = require('./routes/project.routes');
const userRouter = require('./routes/user.routes');
const healthRouter = require('./routes/health.routes');
const imageRouter = require('./routes/image.routes');

const { logger } = require('./util/logger.util');
const { swaggerSpec } = require('./config/docs.config');

const port = process.env.PORT || 5000;

const { handleErrors } = require('./middleware/error.middleware');

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
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1/image', imageRouter);

// Error Handler
app.use(handleErrors);

// 404
app.use('*', (_req, res) => res.sendStatus(404));

// Hey, Listen!
app.listen(port, () => {
  logger.info(`Server listening on port: ${port}...`);
});
