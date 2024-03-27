import express from 'express';
import { handleLogin, handleRefresh } from '../controllers/auth.controller';
import rateLimiter from '../middleware/rate.limit.middleware';

const router = express.Router();

router.route('/').get(handleRefresh).post(rateLimiter, handleLogin);

export default router;
