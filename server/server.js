const port = process.env.PORT || 5000;

const express = require('express');
const app = express();
require('dotenv').config();

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
app.use(express.urlencoded({ extended: true }));

// ! DO I NEED THIS?
app.get('/', (req, res) => {
  res.status(200).send('MERDEV Backend').end();
});

// --- Routes Paths --- //
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/images', imageRoutes);

app.use('/api/send', emailRoutes);

// --- Error Handler --- //
app.use(errorMiddleware);

// --- Listener --- //
app.listen(port, () => {
  console.log(`> Server listening on port: ${port}...`);
});
