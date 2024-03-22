import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMenu, closeMenu } from '../../app/features/menuSlice';
import { toggleLoginModal, toggleRegisterModal } from '../../app/features/modalSlice';

type NavLink = {
  text: string;
  href: string;
};

import './Nav.scss';
import { RootState } from '../../app/store';

export default function Nav({ links }: { links: NavLink[] }) {
  const openMenu = useSelector((state: RootState) => state.menu.value);

  const dispatch = useDispatch();

  // Primary links
  const PrimaryLinks = () => {
    return links.map(({ text, href }) => (
      <li className="nav__item" key={text}>
        <Link to={href} className="nav__link">
          {text}
        </Link>
      </li>
    ));
  };

  // User links - register and login modals
  const UserLinks = () => {
    return (
      <>
        <li className="nav__item">
          <button
            className="nav__link"
            onClick={() => {
              dispatch(toggleRegisterModal());
              dispatch(closeMenu());
            }}
          >
            Register
          </button>
        </li>
        <li className="nav__item">
          <button
            className="nav__button-primary"
            onClick={() => {
              dispatch(toggleLoginModal());
              dispatch(closeMenu());
            }}
          >
            Login
          </button>
        </li>
      </>
    );
  };

  const mobileClass = `nav__links-mobile ${openMenu ? ' nav__links-mobile--open' : ''}`;

  return (
    <nav className="nav">
      <ul className="nav__links-main">
        <PrimaryLinks />
        <UserLinks />
      </ul>
      <ul className={mobileClass}>
        <PrimaryLinks />
        <UserLinks />
      </ul>
      <button role="button" className="nav__toggle" onClick={() => dispatch(toggleMenu())}>
        <span className={`nav__line-one${openMenu ? ' nav__line-one--active' : ''}`}></span>
        <span className={`nav__line-two${openMenu ? ' nav__line-two--active' : ''}`}></span>
        <span className={`nav__line-three${openMenu ? ' nav__line-three--active' : ''}`}></span>
      </button>
    </nav>
  );
}
