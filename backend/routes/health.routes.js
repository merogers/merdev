import express from 'express';
import { handleHealthCheck } from '../controllers/health.controller.js';

const router = express.Router();

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

export default router;
