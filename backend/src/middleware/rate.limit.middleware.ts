import setRateLimit from 'express-rate-limit';

const rateLimiter = setRateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 3,
  message: 'You have exceeded your 3 requests per 15 minute limit.',
  headers: true,
});

export default rateLimiter;
