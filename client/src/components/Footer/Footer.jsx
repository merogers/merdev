import React from 'react';

import { Link } from 'react-scroll';

import { FaGithub, FaLinkedin, FaPhone, FaEnvelope } from 'react-icons/fa';

import './Footer.scss';

import Container from '../Container/Container';

const Footer = () => {
  return (
    <footer className='footer'>
      <Container>
        <div className='footer__container'>
          <div className='footer__column'>
            <ul className='footer__list'>
              <li className='footer__item'>
                <Link
                  to='hero'
                  smooth={true}
                  offset={-64}
                  className='footer__link'
                >
                  Home
                </Link>
              </li>
              <li className='footer__item'>
                <Link
                  to='projects'
                  smooth={true}
                  offset={-64}
                  className='footer__link'
                >
                  Projects
                </Link>
              </li>
              <li className='footer__item'>
                <Link
                  to='about'
                  smooth={true}
                  offset={-64}
                  className='footer__link'
                >
                  About
                </Link>
              </li>
              <li className='footer__item'>
                <Link
                  to='contact'
                  smooth={true}
                  offset={-64}
                  className='footer__link'
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className='footer__column footer__column--topper'>
            <ul className='footer__list'>
              <li className='footer__item'>
                <a
                  href='https://github.com/fetchcat'
                  rel='noreferrer'
                  target='_blank'
                  className='footer__link'
                >
                  <FaGithub className='footer__icon' size='1.5rem' />
                  fetchcat
                </a>
              </li>
              <li className='footer__item'>
                <div className='footer__non-link'>
                  <FaPhone className='footer__icon' size='1.5rem' />
                  (250) 551-8872
                </div>
              </li>
              <li className='footer__item'>
                <a
                  href='https://www.linkedin.com/in/michelleerogers/'
                  rel='noreferrer'
                  target='_blank'
                  className='footer__link'
                >
                  <FaLinkedin className='footer__icon' size='1.5rem' />
                  michelleevarogers
                </a>
              </li>

              <li className='footer__item'>
                <a href='mailto:michelle@merogers.dev' className='footer__link'>
                  <FaEnvelope className='footer__icon' size='1.5rem' />
                  michelle@merogers.dev
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
