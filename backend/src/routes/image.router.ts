import express from 'express';
import handleUploadImage from '../controllers/image.controller';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.route('/').post(upload.single('file'), handleUploadImage);

export default router;
