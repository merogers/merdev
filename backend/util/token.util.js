const jwt = require('jsonwebtoken');

const handleGenerateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

export default handleGenerateToken;
