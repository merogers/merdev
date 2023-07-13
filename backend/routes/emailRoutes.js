const express = require('express');

const router = express.Router();

const { sendSES } = require('../controllers/emailController');

router.route('/').post(sendSES);

module.exports = router;
