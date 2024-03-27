import express from 'express';
import { handleHealthCheck } from '../controllers/health.controller';

import rateLimiter from '../middleware/rate.limit.middleware';

const router = express.Router();

router.route('/').get(rateLimiter, handleHealthCheck);

export default router;
