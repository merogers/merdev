const express = require("express");
const router = express.Router();

const {
  postNewBlog,
  getLatestBlogs,
  getBlogDetails,
  getUserBlogs,
  deleteBlogById,
  putBlog,
} = require("../controllers/blogController");

const { verifyJWT } = require("../middleware/verifyJWT");

// --- Routes for /blog --- //

router.route("/new").post(verifyJWT, postNewBlog);
router.route("/latest").get(getLatestBlogs);
router.route("/:slug").get(getBlogDetails).put(putBlog);

router.route("/user/:id").get(verifyJWT, getUserBlogs);

router.route("/:id").delete(verifyJWT, deleteBlogById);

module.exports = router;
