import { PropsWithChildren, ReactNode } from 'react';
import Link from 'next/link';

type LinkTextProps = {
  children: ReactNode;
  href: string;
};

export function H1({ children }: PropsWithChildren) {
  return <h1 className="text-5xl md:text-5xl text-secondary-500 font-bold mb-4">{children}</h1>;
}

export function H2({ children }: PropsWithChildren) {
  return <h2 className="text-3xl md:text-4xl text-secondary-500 font-semibold mb-2">{children}</h2>;
}

export function H3({ children }: PropsWithChildren) {
  return <h3 className="text-2xl md:text-3xl text-secondary-500 font-semibold mb-2">{children}</h3>;
}

export function H4({ children }: PropsWithChildren) {
  return <h4 className="text-xl md:text-2xl text-secondary-500 font-semibold mb-1">{children}</h4>;
}

export function H5({ children }: PropsWithChildren) {
  return <h5 className="text-lg md:text-xl text-secondary-500 font-medium mb-1">{children}</h5>;
}

export function H6({ children }: PropsWithChildren) {
  return <h6 className="text-base md:text-lg text-secondary-500 font-medium mb-1">{children}</h6>;
}

export function Subtitle({ children }: PropsWithChildren) {
  return (
    <small className="text-sm font-semibold uppercase pl-2 border-l-primary-300 border-l-4 mb-2 text-secondary-300 tracking-wide">
      {children}
    </small>
  );
}

export function Tag({ children }: PropsWithChildren) {
  return (
    <div className="bg-secondary-400 text-secondary-50 md:py-0.5 py-py px-2 md:px-3 uppercase rounded-sm font-light text-sm md:text-base tracking-wide">
      {children}
    </div>
  );
}

export function LinkText({ href, children }: LinkTextProps) {
  return (
    <Link className="text-primary-300 text-semibold mx-1 hover:text-primary-100 transition-colors" href={href}>
      {children}
    </Link>
  );
}

export default function P({ children }: PropsWithChildren) {
  return <p className="text-sm md:text-base leading-6 md:leading-7 mb-3 text-secondary-500">{children}</p>;
}
