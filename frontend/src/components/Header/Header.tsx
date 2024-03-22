import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Nav from '../Nav/Nav';

import './Header.scss';

export default function Header() {
  const [scroll, setScroll] = useState(0);

  // Track scroll location for header classes
  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Navigation links
  const NavigationLinks = [
    {
      text: 'Home',
      href: '/',
    },
    {
      text: 'About',
      href: '/about',
    },
    {
      text: 'Projects',
      href: '/projects',
    },
    {
      text: 'Skills',
      href: '/skills',
    },
    {
      text: 'Contact',
      href: '/contact',
    },
  ];

  // Sticky header class check
  const stickyClass = `header${scroll > 0 ? ' header--sticky' : ''}`;

  return (
    <header className={stickyClass}>
      <div className="header__container">
        <div className="header__items">
          <Link to="/" className="header__logo">
            Header
          </Link>
          <Nav links={NavigationLinks} />
        </div>
      </div>
    </header>
  );
}
