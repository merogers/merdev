import type { RequestHandler } from 'express';

export const healthCheck: RequestHandler = (_req, res, _next) => {
  res.sendStatus(200);
};

export default healthCheck;
