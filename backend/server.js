require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const pc = require('picocolors');

const { errorMiddleware } = require('./middleware/errorMiddleware');

const notFoundRouter = require('./routes/notfound.routes');
const authRouter = require('./routes/auth.routes');

const port = process.env.PORT || 5000;

// --- DB --- //
const { connectDB } = require('./config/db');

connectDB();

// --- CORS - Allow from Client-Side Only --- //

app.use(cors());

// --- Log requests in development mode only --- //
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('tiny'));
}

// --- JSON Parsing Middleware --- //
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/auth', authRouter);

// --- Error Handler --- //
app.use(errorMiddleware);

// --- 404 Catch --- //
app.use('*', notFoundRouter);

// --- Listener --- //
app.listen(port, () => {
  console.info(pc.blue(`> Server listening on port: ${port}...`));
});
