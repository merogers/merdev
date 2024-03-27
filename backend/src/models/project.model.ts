import mongoose from 'mongoose';

import type { ProjectInterface } from '../mongoose';

const ProjectSchema = new mongoose.Schema<ProjectInterface>(
  {
    screenshot: {
      type: String,
      required: [true, 'Screenshot is required'],
      min: [1, 'First Name must be longer than 1 character'],
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
      ref: 'user',
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      min: [1, 'Title must be longer than 1 character'],
      max: [25, 'Title must be shorter than 25 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      min: [1, 'Description must be longer than 1 character'],
      max: [250, 'Description must be shorter than 250 characters'],
    },
    demoUrl: {
      type: String,
      required: [true, 'Demo URL is required'],
      min: [1, 'Demo URL must be longer than 1 character'],
      max: [50, 'Demo URL must be shorter than 50 characters'],
    },
    codeUrl: {
      type: String,
      required: [true, 'Code URL is required'],
      min: [1, 'Code URL must be longer than 1 character'],
      max: [50, 'Code URL must be shorter than 50 characters'],
    },
    tags: {
      type: [String],
      validate: [(value: string) => Array.isArray(value) && value.length > 0, 'At least 1 tag is required'],
    },
  },
  { timestamps: true },
);

const Project = mongoose.model('project', ProjectSchema);

export default Project;
