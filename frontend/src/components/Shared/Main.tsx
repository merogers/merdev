import { ReactNode } from 'react';

type MainProps = {
  children: ReactNode;
  height?: string;
  minHeight?: string;
};

export default function Main({ children, height, minHeight }: MainProps) {
  return (
    <main
      className={`flex px-8 lg:px-0 py-8 flex-1 relative bg-secondary-100 ${height || 'h-[calc(100vh-5rem)]'} ${
        minHeight || 'min-h-min'
      }`}
    >
      {children}
    </main>
  );
}
