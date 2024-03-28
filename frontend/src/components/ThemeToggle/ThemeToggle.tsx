import './ThemeToggle.scss';
import { RootState } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../app/features/themeSlice';

import SunIcon from '../../assets/icons/sun.svg';
import MoonIcon from '../../assets/icons/moon.svg';

export default function ThemeToggle() {
  const theme = useSelector((state: RootState) => state.theme.value);

  const dispatch = useDispatch();

  const checked = theme === 'dark' ? true : false;

  return (
    <div className="toggle" onClick={() => dispatch(toggleTheme())}>
      <div className={`toggle__container${checked ? ' toggle__container--on' : ''}`}>
        <input type="checkbox" className="toggle__checkbox" name="theme" id="theme" checked={checked} />
        <span className={`toggle__indicator${checked ? ' toggle__indicator--on' : ''}`} />
        {checked ? (
          <img src={MoonIcon} alt="Dark Mode" className="toggle__dark" />
        ) : (
          <img src={SunIcon} alt="Light Mode" className="toggle__light" />
        )}
      </div>
    </div>
  );
}
