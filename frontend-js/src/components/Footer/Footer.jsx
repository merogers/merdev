import React from 'react';

import { Link } from 'react-scroll';

import { FaGithub, FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa';

import './Footer.scss';

import Container from '../Container/Container';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <div className="footer__container">
          <div className="footer__column">
            <ul className="footer__list">
              <li className="footer__item">
                <Link
                  to="hero"
                  smooth={true}
                  offset={-64}
                  className="footer__link"
                >
                  Home
                </Link>
              </li>
              <li className="footer__item">
                <Link
                  to="projects"
                  smooth={true}
                  offset={-64}
                  className="footer__link"
                >
                  Projects
                </Link>
              </li>
              <li className="footer__item">
                <Link
                  to="about"
                  smooth={true}
                  offset={-64}
                  className="footer__link"
                >
                  About
                </Link>
              </li>
              <li className="footer__item">
                <Link
                  to="contact"
                  smooth={true}
                  offset={-64}
                  className="footer__link"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer__column footer__column--topper">
            <ul className="footer__list">
              <li className="footer__item">
                <a
                  href="https://github.com/merogersdev/"
                  rel="noreferrer"
                  target="_blank"
                  className="footer__link"
                >
                  <FaGithub className="footer__icon" size="1.5rem" />
                  Github
                </a>
              </li>
              <li className="footer__item">
                <a
                  href="https://www.linkedin.com/in/michelleerogers/"
                  rel="noreferrer"
                  target="_blank"
                  className="footer__link"
                >
                  <FaLinkedin className="footer__icon" size="1.5rem" />
                  LinkedIn
                </a>
              </li>

              <li className="footer__item">
                <a
                  href="https://www.facebook.com/merogersdev"
                  className="footer__link"
                >
                  <FaFacebook className="footer__icon" size="1.5rem" />
                  Facebook
                </a>
              </li>
              <li className="footer__item">
                <a
                  href="https://twitter.com/merogersdev"
                  className="footer__link"
                >
                  <FaTwitter className="footer__icon" size="1.5rem" />
                  Twitter
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
