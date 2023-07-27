import { PropsWithChildren } from 'react';

export default function Container({ children }: PropsWithChildren) {
  return <div className="flex items-start justify-between max-w-screen-lg mx-auto w-full">{children}</div>;
}
