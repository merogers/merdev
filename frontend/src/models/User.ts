import { z } from 'zod';
import { ProjectSchema } from './Project';

const UserSchema = z.object({
  password: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  projects: z.array(ProjectSchema).optional(),
});

export type UserModel = z.infer<typeof UserSchema>;
