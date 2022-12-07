import React, { useState } from 'react';

import './Header.scss';

import { FaBars, FaTimes, FaCode } from 'react-icons/fa';

import Container from '../Container/Container';

import { Link } from 'react-scroll';

const Header = ({ title, toggleLoginModal, toggleRegisterModal }) => {
  const [menuClosed, setMenuClosed] = useState(true);
  const toggleMenu = () => {
    setMenuClosed((prev) => !prev);
  };

  return (
    <header className='header'>
      <Container>
        <div className='header__content'>
          <Link className='header__logo' to='hero' smooth={true}>
            <FaCode className='header__icon' /> {title}
          </Link>
          <nav className='header__nav'>
            <ul
              className={`header__nav-list${
                menuClosed ? ' header__nav-list--close' : ''
              }`}
            >
              <li className='header__nav-item'>
                <Link
                  to='hero'
                  smooth={true}
                  spy={true}
                  offset={-64}
                  className='header__nav-link'
                  activeClass='header__nav-link--active'
                >
                  Home
                </Link>
              </li>
              <li className='header__nav-item'>
                <Link
                  to='projects'
                  smooth={true}
                  spy={true}
                  offset={-64}
                  className='header__nav-link'
                  activeClass='header__nav-link--active'
                >
                  Projects
                </Link>
              </li>
              <li className='header__nav-item'>
                <Link
                  to='about'
                  smooth={true}
                  spy={true}
                  offset={-64}
                  className='header__nav-link'
                  activeClass='header__nav-link--active'
                >
                  About
                </Link>
              </li>
              <li className='header__nav-item'>
                <Link
                  to='contact'
                  smooth={true}
                  spy={true}
                  offset={-64}
                  className='header__nav-link'
                  activeClass='header__nav-link--active'
                >
                  Contact
                </Link>
              </li>
              <li className='header__nav-item'>
                <button
                  className='header__nav-link'
                  onClick={toggleRegisterModal}
                >
                  Register
                </button>
              </li>
              <li className='header__nav-item'>
                <button
                  className='header__button-sm-outline'
                  onClick={toggleLoginModal}
                >
                  Login
                </button>
              </li>
            </ul>
            <div className='header__nav-toggle' onClick={toggleMenu}>
              {menuClosed ? <FaBars /> : <FaTimes />}
            </div>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;
