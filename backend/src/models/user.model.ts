import mongoose from 'mongoose';
import { z } from 'zod';

import type { TypeOf } from 'zod';

export const CreateUserInputSchema = z.object({
  firstName: z
    .string({
      required_error: 'First Name is required',
    })
    .min(2, 'First Name too short'),
  lastName: z
    .string({
      required_error: 'Last Name is required',
    })
    .min(2, 'Last Name too short'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password too short - should be 6 chars minimum'),
});

export const LoginInputSchema = z.object({
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password too short - should be 6 chars minimum'),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Not a valid email'),
});

export type CreateUserInputType = TypeOf<typeof CreateUserInputSchema>;
export type LoginInputType = TypeOf<typeof LoginInputSchema>;

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
});

const User = mongoose.model('User', UserSchema);

export default User;
