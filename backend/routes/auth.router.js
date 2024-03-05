const express = require('express');

const router = express.Router();

const { handleLogin } = require('../controllers/auth.controller');

router.route('/').post(handleLogin);

module.exports = router;
