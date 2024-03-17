import mongoose from 'mongoose';

export interface UserInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema<UserInterface>(
  {
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
  },
  {
    toJSON: {
      transform: (_, ret) => {
        delete ret.password;
      },
    },
  },
);

const User = mongoose.model('user', UserSchema);

export default User;
