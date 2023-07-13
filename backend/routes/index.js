const express = require('express');

const router = express.Router();
const path = require('path');

const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const emailRoutes = require('./emailRoutes');

router.use(express.static(path.join(__dirname, '../../frontend/build')));

router.use('/api/users', userRoutes);
router.use('/api/projects', projectRoutes);
router.use('/api/email', emailRoutes);

module.exports = router;
