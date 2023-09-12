'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Menu } from 'react-feather';
import { useAppSelector } from '../../redux/store';

export const navLinks = [
  { title: 'Home', href: '/' },
  { title: 'Projects', href: '/projects' },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
  { title: 'Register', href: '/register' },
  { title: 'Login', href: '/login' },
  { title: 'Dashboard', href: '/dashboard' },
];

export default function Nav() {
  const { user } = useAppSelector(state => state.auth);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  function toggleOpen() {
    setIsOpen(prev => !prev);
  }

  const pathname = usePathname();

  // If user, display logout, else display login
  const authState = user ? 'Login' : 'Dashboard';

  return (
    <nav className="flex items-center">
      <ul
        className={`flex fixed w-screen bg-secondary-400 left-0 ${
          isOpen ? 'top-0' : 'top-[-100vh]'
        } h-screen flex-col items-center justify-center md:flex-row transition-[top] md:relative md:h-full md:w-min pr-0 md:bottom-0 md:top-auto`}
      >
        {navLinks
          .filter(({ title }) => title !== authState)
          .map(({ title, href }) => {
            const isActive = pathname === href;

            return (
              <li key={title}>
                <Link
                  href={href}
                  className={`flex items-center text-sm hover:text-white transition-colors px-4 w-min h-16 uppercase ${
                    isActive ? 'border-b-4 border-primary-100 pt-1 text-white' : 'text-secondary-200'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {title}
                </Link>
              </li>
            );
          })}
      </ul>
      <button
        className="fixed right-4 md:hidden px-4 py-2 rounded-sm z-20 text-gray-400 hover:text-white transition-colors top-0 h-full"
        onClick={() => toggleOpen()}
      >
        {isOpen ? <X /> : <Menu />}
      </button>
    </nav>
  );
}
