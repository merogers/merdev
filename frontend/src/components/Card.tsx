import { PropsWithChildren } from 'react';

export default function Card({ children }: PropsWithChildren) {
  return <article className="flex bg-white drop-shadow-lg rounded-sm w-full">{children}</article>;
}
