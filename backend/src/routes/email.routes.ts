import express from 'express';
import { handleEmail } from '../controllers/email.controller';
import rateLimiter from '../middleware/rate.limit.middleware';

const router = express.Router();

router.route('/').post(rateLimiter, handleEmail);

export default router;
