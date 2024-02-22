import express from 'express';
import handleSendEmail from '../controllers/email.controller';

const router = express.Router();

/**
 * @openapi
 * /api/v1/email:
 *   post:
 *     summary: Send Email
 *     description: Send email via Amazon SES
 *     tags:
 *      - email
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Failed validation
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Describes Error
 *                  example: Cannot send message
 *
 */
router.route('/').post(handleSendEmail);

export default router;
