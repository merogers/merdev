import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './Header.scss';

import { FaBars, FaTimes } from 'react-icons/fa';

import Container from '../Container/Container';

import { Link, animateScroll as scroll } from 'react-scroll';
import useScroll from '../../hooks/useScroll';

import { logout, reset } from '../../features/auth/authSlice';

const Header = ({ title, setLoginModal, setRegisterModal }) => {
  const [menuClosed, setMenuClosed] = useState(true);
  const toggleMenu = () => {
    setMenuClosed((prev) => !prev);
  };

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // Disallow scroll when menu is open
  useScroll(!menuClosed);

  // Logout user, reset auth state to initial, delete localStorage
  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    scroll.scrollToTop();
  };

  return (
    <header className='header'>
      <Container>
        <div className='header__content'>
          <Link className='header__logo' to='hero' smooth={true}>
            {title}
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
                  onClick={() => setRegisterModal((prev) => !prev)}
                >
                  Register
                </button>
              </li>
              <li className='header__nav-item'>
                {user ? (
                  <button
                    className='header__button-sm-outline'
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    className='header__button-sm-outline'
                    onClick={() => setLoginModal((prev) => !prev)}
                  >
                    Login
                  </button>
                )}
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
