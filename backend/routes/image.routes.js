const express = require('express');

const router = express.Router();

const { handleImageUpload, handleImageDelete } = require('../controllers/image.controller');
const { upload } = require('../middleware/image.middleware');

/**
 * @swagger
 * /api/v1/image:
 *   post:
 *     summary: Image Upload
 *     tags:
 *       - image
 *     description: Image Upload
 */
router.route('/').post(upload.single('file'), handleImageUpload);

router.route('/:filename').delete(handleImageDelete);

module.exports = router;
