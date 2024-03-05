const express = require('express');

const router = express.Router();

const { handleEmail } = require('../controllers/email.controller');

router.route('/').post(handleEmail);

module.exports = router;
