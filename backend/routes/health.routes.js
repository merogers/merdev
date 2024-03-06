const express = require('express');

const router = express.Router();

const { handleHealthCheck } = require('../controllers/health.controller');

/**
 * @swagger
 * /api/v1/health:
 *   get:
 *     summary: Basic Health Check
 *     tags:
 *       - health
 *     description: Returns Status Code 200
 */
router.route('/').get(handleHealthCheck);

module.exports = router;
