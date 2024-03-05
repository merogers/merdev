const express = require('express');

const router = express.Router();

const { handleRegister, handleLogin } = require('../controllers/auth.controller');

router.route('/').post(handleRegister);
router.route('/login').post(handleLogin);

module.exports = router;
