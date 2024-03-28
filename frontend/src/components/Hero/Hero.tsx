import './Hero.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export default function Hero() {
  const theme = useSelector((state: RootState) => state.theme.value);

  return (
    <div className={`hero${theme === 'light' ? ' hero--light' : ' hero--dark'}`}>
      <h1 className="hero__h1">Hero</h1>
    </div>
  );
}
