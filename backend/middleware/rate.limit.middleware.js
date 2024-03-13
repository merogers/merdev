import setRateLimit from 'express-rate-limiter';

const rateLimiter = setRateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: 'You have exceeded your 10 requests per minute limit.',
  header: true,
});

export default rateLimiter;
