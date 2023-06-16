const express = require('express');
const router = express.Router();

const { sendGrid } = require('../controllers/emailController');

router.route('/').post(sendGrid);

module.exports = router;
