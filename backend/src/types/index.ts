import { Request, Response } from 'express';

export type Jwt = {
  id: string;
  iat: number;
  exp: number;
};

export interface TokenRequest extends Request {
  user: Jwt;
}

export interface TokenResponse extends Response {
  user: Jwt;
}
