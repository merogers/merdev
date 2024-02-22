import express from 'express';
import handleSendEmail from '../controllers/email.controller';

const router = express.Router();

router.route('/').post(handleSendEmail);

export default router;
