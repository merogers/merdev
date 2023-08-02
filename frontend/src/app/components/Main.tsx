import { ReactNode } from 'react';

type MainProps = {
  children: ReactNode;
  height: string;
};

export default function Main({ children, height = 'min-h-[calc(100vh-5rem)]' }: MainProps) {
  return <main className={`flex px-8 lg:px-0 py-8 flex-1 relative bg-secondary-100 ${height}`}>{children}</main>;
}
