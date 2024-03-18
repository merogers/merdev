import setRateLimit from 'express-rate-limit';

const rateLimiter = setRateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  message: 'You have exceeded your 30 requests per 15 minute limit.',
  headers: true,
});

export default rateLimiter;
