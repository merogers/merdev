import { z } from 'zod';
import mongoose from 'mongoose';
import ObjectIdSchema from './object.model';

export const CreateProjectSchema = z.object({
  screenshotUrl: z
    .string({
      required_error: 'Screenshot URL is required',
    })
    .min(1, 'Screenshot URL too short. Must be more than 1 char.'),
  screenshotFile: z
    .string({
      required_error: 'Screenshot File is required',
    })
    .min(1, 'Screenshot File too short. Must be more than 1 char.'),
  userid: ObjectIdSchema,
  title: z
    .string({
      required_error: 'Title is required',
    })
    .min(1, 'Title is too short. Must be more than 1 char.'),
  description: z
    .string({
      required_error: 'Description is required',
    })
    .min(1, 'Description is too short. Must be more than 1 char.'),
  demoUrl: z
    .string({
      required_error: 'Demo URL is required',
    })
    .min(1, 'Demo URL is too short. Must be more than 1 char.'),
  tags: z
    .string({
      required_error: 'At least one tag is required',
    })
    .array()
    .nonempty(),
});

const ProjectSchema = new mongoose.Schema(
  {
    screenshot: {
      type: String,
      required: true,
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
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

const Project = mongoose.model('Project', ProjectSchema);

export default Project;
