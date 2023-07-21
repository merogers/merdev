import { PropsWithChildren } from 'react';

export default function Container({ children }: PropsWithChildren) {
  return <div className="flex items-center justify-between max-w-screen-lg mx-auto w-full">{children}</div>;
}
