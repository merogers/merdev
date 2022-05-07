const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [1, "Please enter first name"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [1, "Please enter last name"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minLength: [6, "minimum password length is 6 chars"],
  },
});

// Hash PW before adding to DB

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
