const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

const {
  postNewProject,
  getLatestProjects,
  getProjectDetails,
  deleteProjectById,
  putUpdateProject,
} = require('../controllers/projectController');

router.route('/').get(getLatestProjects).post(protect, postNewProject);

router
  .route('/:id')
  .get(getProjectDetails)
  .put(protect, putUpdateProject)
  .delete(protect, deleteProjectById);

module.exports = router;
