import express from 'express';

import getAllUsers, { getUserProfile, deleteUser } from '../controllers/user';

// Only check for ownership on params routes.
import { isOwner } from '../middleware/auth';

const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/:id').get(isOwner, getUserProfile).delete(isOwner, deleteUser);

export default router;
