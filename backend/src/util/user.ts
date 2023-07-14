import User from '../models/user';
import { hashString, randomString } from './crypto';

const getUsers = () => User.find().select('-password');

export const getUserByEmail = (email: string) => User.findOne({ email });

export const getUserById = (id: string) => User.findOne({ id });

export const createUser = async (values: { email: string; name: string; password: string }) => {
  const salt = randomString();

  const newUser = new User({
    email: values.email,
    name: values.name,
    password: hashString(salt, values.password),
    salt,
    sessionToken: '',
  });

  await newUser.save();

  return newUser;
};

export const deleteUserById = async (id: string) => User.findByIdAndDelete({ id });

export const updateUserById = (
  id: string,
  values: {
    [key: string]: string;
  },
) =>
  User.findByIdAndUpdate(id, {
    ...values,
  });

export default getUsers;
