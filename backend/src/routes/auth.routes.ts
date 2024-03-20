import express from 'express';
import { handleLogin, handleRefresh } from '../controllers/auth.controller';
import rateLimiter from '../middleware/rate.limit.middleware';

const router = express.Router();

/**
 * @swagger
 * /api/v1/auth:
 *   get:
 *     summary: User Refresh Token
 *     tags:
 *       - auth
 *     description: Generates a new auth token from refresh token
 *   post:
 *     summary: User Login
 *     tags:
 *       - auth
 *     description: Logs in user and generates JWT Token
 */
router.route('/').get(handleRefresh).post(rateLimiter, handleLogin);

export default router;
