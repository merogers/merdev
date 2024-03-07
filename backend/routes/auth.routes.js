import express from 'express';
import { handleLogin } from '../controllers/auth.controller.js';

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
router.route('/').post(handleLogin);

export default router;
