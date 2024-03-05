const express = require('express');

const router = express.Router();

const {
  handleCreateUser,
  handleUserDetails,
  handleUpdateUser,
  handleDeleteUser,
} = require('../controllers/user.controller');

router.route('/').post(handleCreateUser);

router.route('/:id').get(handleUserDetails).patch(handleUpdateUser).delete(handleDeleteUser);

module.exports = router;
