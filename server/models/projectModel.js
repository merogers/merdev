const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
  screenshotUrl: {
    type: String,
    required: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
});

const Project = mongoose.model('project', ProjectSchema);

module.exports = Project;
