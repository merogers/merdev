import express from 'express';

import sendSES from '../controllers/email';

const router = express.Router();

router.route('/').post(sendSES);

export default router;
