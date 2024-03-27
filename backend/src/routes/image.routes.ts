import express from 'express';
import { handleImageUpload, handleImageDelete } from '../controllers/image.controller';
import { upload } from '../middleware/image.middleware';

import { handleProtectRoute } from '../middleware/auth.middleware';

import rateLimiter from '../middleware/rate.limit.middleware';

const router = express.Router();

router.route('/').post(rateLimiter, handleProtectRoute, upload.single('file'), handleImageUpload);

router.route('/:filename').delete(handleProtectRoute, handleImageDelete);

export default router;
