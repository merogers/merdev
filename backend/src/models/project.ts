import mongoose from 'mongoose';

export interface ProjectType {
  screenshotUrl: string;
  screenshotFile: string;
  userid: string;
  title: string;
  description: string;
  demoUrl: string;
  codeUrl: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new mongoose.Schema(
  {
    screenshotUrl: {
      type: String,
      required: true,
    },
    screenshotFile: {
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
