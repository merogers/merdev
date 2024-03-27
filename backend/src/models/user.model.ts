import mongoose from 'mongoose';

import { testEmail } from '../util/regex.util';

import type { UserInterface } from '../mongoose';

const UserSchema = new mongoose.Schema<UserInterface>(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is required'],
      min: [1, 'First Name must be longer than 1 character'],
      max: [25, 'First Name must be shorter than 25 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'First Name is required'],
      min: [1, 'First Name must be longer than 1 character'],
      max: [25, 'First Name must be shorter than 25 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: [testEmail, 'Email must be valid'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      min: [8, 'Password must be longer than 8 characters'],
      max: [25, 'Password must be shorter than 25 characters'],
    },
  },
  {
    toJSON: {
      transform: (_, ret) => {
        delete ret.password;
      },
    },
  },
);

UserSchema.virtual('projects', {
  ref: 'project',
  localField: '_id',
  foreignField: 'userid',
});

const User = mongoose.model('user', UserSchema);

export default User;
