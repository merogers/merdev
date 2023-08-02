import { ReactNode } from 'react';
import Link from 'next/link';

interface IconLinkProps {
  children: ReactNode;
  href: string;
}

export default function IconLink({ children, href }: IconLinkProps) {
  return (
    <Link href={href} className="hover:text-white p-2" rel="noopener noreferrer" target="_blank">
      {children}
    </Link>
  );
}
