const asyncHandler = require("express-async-handler");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Generat JWT Token
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

// DESC:    Registers New User
// ROUTE:   POST with JSON to /api/users/register
// ACCESS:  Public
const postRegisterUser = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  // Check for Blank fields
  if (!email || !password || !firstName || !lastName) {
    res.status(400);
    throw new Error("Cannot register user: missing fields");
  }

  // Check if user exists before trying to create new one
  const userExists = await User.findOne({ email });

  if (userExists !== null) {
    res.status(400);
    throw new Error("Cannot register user: user already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = {
    email,
    password: hashedPassword,
    firstName,
    lastName,
  };
  const user = await User.create(newUser);

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Cannot register user: invalid data");
  }
});

// DESC:    User Login
// ROUTE:   POST with JSON to /api/users/login
// ACCESS:  Public
const postLoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for required fields
  if (!email || !password) {
    res.status(400);
    throw new Error("Invalid Request");
  }

  const user = await User.findOne({ email });

  if (user === null) {
    res.status(404);
    throw new Error("User Not Found");
  }

  const result = await bcrypt.compare(password, user.password);

  // Check User Exists and Passwords match
  if (user && result) {
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credenials");
  }
});

// Test Auth Token
const getMyDetails = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = { postRegisterUser, postLoginUser, getMyDetails };
