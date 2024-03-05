const asyncHandler = require('express-async-handler');

const handleNotFound = asyncHandler(async (_req, res) => res.status(404).json({ message: 'Endpoint not found' }));

export default handleNotFound;
