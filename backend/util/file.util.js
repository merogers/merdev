const crypto = require('crypto');

const generateFileName = (bytes = 16) => crypto.randomBytes(bytes).toString('hex');

module.exports = { generateFileName };
