import express from 'express';
import uploadImage from '../controllers/image';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.route('/').post(upload.single('file'), uploadImage);

export default router;
