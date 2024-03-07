import express from 'express';
import { handleImageUpload, handleImageDelete } from '../controllers/image.controller.js';
import { upload } from '../middleware/image.middleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/v1/image:
 *   post:
 *     summary: Image Upload
 *     tags:
 *       - image
 *     description: Image Upload
 *   delete:
 *     summary: Image Delete
 *     tags:
 *       - image
 *     description: Image Delete
 */
router.route('/').post(upload.single('file'), handleImageUpload);

router.route('/:filename').delete(handleImageDelete);

export default router;
