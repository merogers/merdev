const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

const {
  postRegisterUser,
  postLoginUser,
  getMyDetails,
} = require('../controllers/userController');

router.route('/').post(postRegisterUser);
router.route('/login').post(postLoginUser);
router.route('/mydetails').get(protect, getMyDetails);

module.exports = router;
