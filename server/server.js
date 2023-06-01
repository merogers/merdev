require('dotenv').config();
const port = process.env.PORT || 5000;
const path = require('path');

const express = require('express');
const app = express();
const cors = require('cors');
const colors = require('colors');

const { errorMiddleware } = require('./middleware/errorMiddleware');

// --- DB --- //
const { connectDB } = require('./config/db');
connectDB();

// --- Route Imports --- //
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const emailRoutes = require('./routes/emailRoutes');

// --- CORS - Allow from Client-Side Only --- //
app.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.CLIENT_URL_WWW],
  })
);

// --- Log requests in development mode only --- //

if (process.env.NODE_ENV === 'development') {
  app.use((req, _res, next) => {
    console.log('Request Body:', req.body);
    console.log('Request URL:', req.originalUrl);
    next();
  });
}

// --- JSON Parsing Middleware --- //
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- Routes Paths --- //
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

app.use('/api/email', emailRoutes);

// --- Serve Static Frontend Files - Node.js Deployment Only --- //
if (process.env.NODE_DEPLOY === 'true') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (_req, res) =>
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
  );
} else {
  app.get('/', (_req, res) => {
    res.send('MERDEV Portfolio API');
  });
}

// --- Error Handler --- //
app.use(errorMiddleware);

// --- Listener --- //
app.listen(port, () => {
  console.log(colors.blue(`> Server listening on port: ${port}...`));
});
