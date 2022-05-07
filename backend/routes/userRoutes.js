const express = require("express");
const router = express.Router();

const {
  postRegisterUser,
  postLoginUser,
  getIsAuth,
} = require("../controllers/userController");

const { verifyJWT } = require("../middleware/verifyJWT");

// --- User Routes for /user --- //

router.route("/login").post(postLoginUser);
router.route("/register").post(postRegisterUser);
router.route("/isauth").get(verifyJWT, getIsAuth);

module.exports = router;
