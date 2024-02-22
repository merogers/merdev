import { z } from 'zod';

import type { TypeOf } from 'zod';

export const CreateEmailSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(1, 'Name too short'),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .regex(new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), 'Email is invalid')
    .min(1, 'Email too short'),
  phone: z.string().regex(new RegExp('^(+d{1,2}s)?(?d{3})?[s.-]d{3}[s.-]d{4}$'), 'Phone is invalid').optional(),
  message: z
    .string({
      required_error: 'Email is required',
    })
    .min(1, 'Email too short'),
  jobRole: z.string().optional(),
});

export type CreateEmailType = TypeOf<typeof CreateEmailSchema>;

export default CreateEmailSchema;
