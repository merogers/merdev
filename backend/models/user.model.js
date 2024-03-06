const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
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

module.exports = User;
