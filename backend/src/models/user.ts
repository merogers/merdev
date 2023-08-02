import mongoose from 'mongoose';

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
  accessToken: {
    type: String,
  },
});

// Add Object and JSON Virtual Support
UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });

// Add virtual field to User, mimicing relational DB
UserSchema.virtual('projects', {
  localField: '_id',
  foreignField: 'userid',
  ref: 'Project',
});

const User = mongoose.model('User', UserSchema);

export default User;
