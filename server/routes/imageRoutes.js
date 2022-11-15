const express = require('express');
const router = express.Router();

const { multer } = require('../middleware/imageMiddleware');
const { protect } = require('../middleware/authMiddleware');

const { uploadImage } = require('../controllers/imageController');

// --- Private Routes --- //
router.route('/upload').post(protect, multer.single('imgFile'), uploadImage);

module.exports = router;
