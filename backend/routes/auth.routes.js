const express = require('express');

const router = express.Router();

const { handleLogin } = require('../controllers/auth.controller');

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

module.exports = router;
