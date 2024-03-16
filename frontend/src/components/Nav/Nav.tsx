import { useState } from 'react';
import { Link } from 'react-router-dom';

type NavLink = {
  text: string;
  href: string;
};

import './Nav.scss';

export default function Nav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const linkMap =
    links &&
    links.map(({ text, href }) => (
      <li className="nav__item" key={text}>
        <Link to={href} className="nav__link">
          {text}
        </Link>
      </li>
    ));

  return (
    <nav className="nav">
      <ul className="nav__links-main">
        {linkMap}
        <li className="nav__item">
          <button className="nav__link">Register</button>
        </li>
        <li className="nav__item">
          <button className="nav__button-primary">Login</button>
        </li>
      </ul>
      <ul className={`nav__links-mobile ${open ? ' nav__links-mobile--open' : ''}`}>
        {linkMap}
        <li className="nav__item">
          <button className="nav__link">Register</button>
        </li>
        <li className="nav__item">
          <button className="nav__button-primary">Login</button>
        </li>
      </ul>
      <button role="button" className="nav__toggle" onClick={toggleOpen}>
        <span className={`nav__line-one${open ? ' nav__line-one--active' : ''}`}></span>
        <span className={`nav__line-two${open ? ' nav__line-two--active' : ''}`}></span>
        <span className={`nav__line-three${open ? ' nav__line-three--active' : ''}`}></span>
      </button>
    </nav>
  );
}
