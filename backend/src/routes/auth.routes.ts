import express from 'express';
import { handleLogin } from '../controllers/auth.controller';
import rateLimiter from '../middleware/rate.limit.middleware';

const router = express.Router();

/**
 * @swagger
 * /api/v1/auth:
 *   post:
 *     summary: User Login
 *     tags:
 *       - auth
 *     description: Logs in user and generates JWT Token
 */
router.route('/').post(rateLimiter, handleLogin);

export default router;
