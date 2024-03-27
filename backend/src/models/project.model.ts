import mongoose from 'mongoose';

import type { ProjectInterface } from '../mongoose';

const ProjectSchema = new mongoose.Schema<ProjectInterface>(
  {
    screenshot: {
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
    demoUrl: {
      type: String,
      required: true,
    },
    codeUrl: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true },
);

const Project = mongoose.model('project', ProjectSchema);

export default Project;
