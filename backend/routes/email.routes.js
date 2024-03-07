import express from 'express';
import { handleEmail } from '../controllers/email.controller.js';

import { handleProtectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/v1/email:
 *   post:
 *     summary: Send Email
 *     tags:
 *       - email
 *     description: Sends email, generated from contact form
 */
router.route('/').post(handleProtectRoute, handleEmail);

export default router;
