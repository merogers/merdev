import { z } from 'zod';

export const ProjectSchema = z.object({
  screenshotUrl: z.string(),
  screenshotFile: z.string(),
  userid: z.string(),
  title: z.string(),
  description: z.string(),
  demoUrl: z.string(),
  codeUrl: z.string(),
  tags: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ProjectModel = z.infer<typeof ProjectSchema>;
