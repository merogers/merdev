const express = require('express');

const router = express.Router();

const { handleEmail } = require('../controllers/email.controller');

/**
 * @swagger
 * /api/v1/email:
 *   post:
 *     summary: Send Email
 *     tags:
 *       - email
 *     description: Sends email, generated from contact form
 */
router.route('/').post(handleEmail);

module.exports = router;
