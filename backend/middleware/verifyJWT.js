const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send({ isAuth: false, message: "No JWT Token" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({ isAuth: false, message: "Invalid JWT Token" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

module.exports = { verifyJWT };
