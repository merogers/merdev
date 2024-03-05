const express = require('express');

const router = express.Router();

const { handleHealthCheck } = require('../controllers/health.controller');

router.route('/').get(handleHealthCheck);

module.exports = router;
