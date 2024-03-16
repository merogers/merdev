import { Link } from 'react-router-dom';

import Nav from '../Nav/Nav';

import './Header.scss';

export default function Header() {
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
      text: 'Contact',
      href: '/contact',
    },
  ];

  return (
    <header className="header">
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
