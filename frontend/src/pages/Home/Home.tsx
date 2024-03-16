import './Home.scss';
import About from './About';

import Typewriter from './Typewriter';
import HeroReact from '../../assets/hero_react.svg';

export default function Home() {
  return (
    <main className="home__main">
      <div className="home__container">
        <div className="home__hero">
          <div className="home__hero-items">
            <Typewriter text="Hi, I'm Michelle." delay={100} />
            <p className="home__tagline">Freelance Web Developer. Tech Enthusiast. Cat Person.</p>
          </div>
          <div className="home__hero-feature">
            <img src={HeroReact} alt="Hero Image" className="home__hero-image" />
          </div>
        </div>
      </div>
      <About />
    </main>
  );
}
