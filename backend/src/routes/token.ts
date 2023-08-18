import express from 'express';
import { refreshJwtToken, logoutUser } from '../controllers/token';

const router = express.Router();

router.route('/refresh').get(refreshJwtToken);
router.route('/logout').get(logoutUser);

export default router;
