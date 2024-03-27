import type { Request, Response, NextFunction } from 'express';
import type { ResponseType } from '../express';

export const handleHealthCheck = async (_req: Request, res: Response, next: NextFunction): ResponseType => {
  try {
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
