import { z } from 'zod';

import type { TypeOf } from 'zod';

const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

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
    .regex(emailRegex, 'Email is invalid'),
  phone: z.string().regex(phoneRegex, 'Phone is invalid').optional(),
  message: z
    .string({
      required_error: 'Message is required',
    })
    .min(1, 'Message too short'),
  jobRole: z.string().optional(),
});

export type CreateEmailType = TypeOf<typeof CreateEmailSchema>;

export default CreateEmailSchema;
