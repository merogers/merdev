'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleOpen() {
    setIsOpen(prev => !prev);
  }

  const pathname = usePathname();

  const navLinks = [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/about' },
    { title: 'Projects', href: '/projects' },
    { title: 'Contact', href: '/contact' },
    { title: 'Register', href: '/register' },
    { title: 'Login', href: '/login' },
  ];

  return (
    <nav className="flex items-center">
      <ul
        className={`flex fixed w-screen bg-secondary-100 left-0 ${
          isOpen ? 'top-0' : 'top-[-100vh]'
        } h-screen flex-col items-center justify-center md:flex-row transition-[top] md:relative md:h-full md:w-min pr-0 md:pr-4 md:bottom-0 md:top-auto`}
      >
        {navLinks.map(({ title, href }) => {
          const isActive = pathname.startsWith(href);

          return (
            <Link
              key={title}
              href={href}
              className={` flex items-center text-sm md:text-base font-medium hover:text-white transition-colors px-4 w-min h-16 ${
                isActive ? 'border-b-4 border-primary-200 pt-1' : 'text-gray-400'
              }`}
            >
              {title}
            </Link>
          );
        })}
      </ul>
      <button
        className="fixed right-4 md:hidden px-4 py-2 rounded-sm z-20 text-gray-400 hover:text-white transition-colors"
        onClick={() => toggleOpen()}
      >
        <FontAwesomeIcon icon={isOpen ? faXmark : faBars} className="h-4" />
      </button>
    </nav>
  );
}

export default Nav;
