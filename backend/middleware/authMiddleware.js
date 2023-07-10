const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  const authToken = req.headers.authorization;

  if (authToken && authToken.startsWith("Bearer")) {
    try {
      // Get token
      const bearer = authToken.split(" ")[1];
      token = bearer;

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, missing token");
  }
});

module.exports = { protect };
