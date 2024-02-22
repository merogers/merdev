import express from 'express';
import healthCheck from '../controllers/health.controller';

const router = express.Router();

/**
 * @openapi
 * /api/v1/health:
 *   get:
 *     summary: Health Check
 *     description: Health Check for Dev Portfolio API
 *     tags:
 *      - health
 *     responses:
 *       200:
 *         description: OK
 */
router.route('/').get(healthCheck);

export default router;
