import { ReactNode } from 'react';

export interface Node {
  children: ReactNode;
}

export interface ErrorMsg extends Error {
  data: {
    message: string;
  };
}
