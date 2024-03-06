const express = require('express');

const router = express.Router();

const {
  handleCreateUser,
  handleUserDetails,
  handleUpdateUser,
  handleDeleteUser,
} = require('../controllers/user.controller');

/**
 * @swagger
 * /api/v1/user:
 *   post:
 *     summary: Register User
 *     tags:
 *       - user
 *     description: Creates new user
 */
router.route('/').post(handleCreateUser);

/**
 * @swagger
 * /api/v1/user/:id:
 *   get:
 *     summary: User Details
 *     tags:
 *       - user
 *     description: Fetches user details
 *   patch:
 *     summary: Update User
 *     tags:
 *       - user
 *     description: Patch request to update user
 *   delete:
 *     summary: Delete User
 *     tags:
 *       - user
 *     description: Deletes a user
 */
router.route('/:id').get(handleUserDetails).patch(handleUpdateUser).delete(handleDeleteUser);

module.exports = router;
