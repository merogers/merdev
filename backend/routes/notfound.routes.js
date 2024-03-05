const express = require('express');

const router = express.Router();

const handleNotFound = require('../controllers/notfound.controller');

router.all('/', handleNotFound);

module.exports = router;
