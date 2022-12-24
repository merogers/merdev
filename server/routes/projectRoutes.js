const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

const { multer } = require('../middleware/imageMiddleware');

const {
  postNewProject,
  getLatestProjects,
  getUserProjects,
  getProjectDetails,
  deleteProjectById,
  putUpdateProject,
} = require('../controllers/projectController');

router.route('/latest').get(getLatestProjects);

router
  .route('/')
  .get(getUserProjects)
  .post(protect, multer.single('screenshot'), postNewProject);
router
  .route('/:id')
  .get(getProjectDetails)
  .patch(protect, putUpdateProject)
  .delete(protect, deleteProjectById);

module.exports = router;
