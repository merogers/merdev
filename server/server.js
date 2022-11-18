const port = process.env.PORT || 5000;

const express = require('express');
const app = express();
require('dotenv').config();

const colors = require('colors');

const { errorMiddleware } = require('./middleware/errorMiddleware');

// --- DB --- //
const { connectDB } = require('./config/db');
connectDB();

// --- Route Imports --- //
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const emailRoutes = require('./routes/emailRoutes');
const imageRoutes = require('./routes/imageRoutes');

// --- JSON Parsing Middleware --- //
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- Routes Paths --- //
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

app.use('/api/image', imageRoutes);
app.use('/api/email', emailRoutes);

// --- Error Handler --- //
app.use(errorMiddleware);

// --- Listener --- //
app.listen(port, () => {
  console.log(colors.blue(`> Server listening on port: ${port}...`));
});

/* Endpoints

GET   /                     Public

POST  /api/users/login      Public
POST  /api/users/register   Public
GET   /api/users/mydetails  Private

GET   /api/projects         Public
POST  /api/projects         Private
GET   /api/projects/:id     Public
PUT   /api/projects/:id     Private
DEL   /api/projects/:id     Private

POST  /api/image/upload     Public

POST  /api/email/send       Public

*/
