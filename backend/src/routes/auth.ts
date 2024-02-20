import express from 'express';
import { loginUser, registerUser, refreshJwtToken, logoutUser } from '../controllers/auth';

const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(loginUser);
router.route('/refresh').get(refreshJwtToken);
router.route('/logout').get(logoutUser);

export default router;
