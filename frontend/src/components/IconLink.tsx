import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface IconLinkProps {
  children: ReactNode;
  href: string;
}

export default function IconLink({ children, href }: IconLinkProps) {
  return (
    <Link to={href} className="hover:text-white p-2" rel="noopener noreferrer" target="_blank">
      {children}
    </Link>
  );
}
