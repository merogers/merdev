import express from 'express';
import {
  handleCreateUser,
  handleUserDetails,
  handleUpdateUser,
  handleDeleteUser,
} from '../controllers/user.controller';

import { handleProtectRoute } from '../middleware/auth.middleware';
import rateLimiter from '../middleware/rate.limit.middleware';

const router = express.Router();

router.route('/').post(rateLimiter, handleCreateUser);

router
  .route('/:id')
  .get(handleProtectRoute, handleUserDetails)
  .patch(handleProtectRoute, handleUpdateUser)
  .delete(handleProtectRoute, handleDeleteUser);

export default router;
