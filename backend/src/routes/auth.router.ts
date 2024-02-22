import express from 'express';
import loginHandler from '../controllers/auth.controller';

const router = express.Router();

router.route('/').post(loginHandler);

export default router;
