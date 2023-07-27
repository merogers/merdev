import { ReactNode } from 'react';

// Return client component from server component
export default function Wrapper({ element }: { element: ReactNode }) {
  return element;
}
