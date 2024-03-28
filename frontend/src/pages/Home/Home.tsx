// import About from './About';
import Login from '../../components/Modal/Login';
import Register from '../../components/Modal/Register';
// import Typewriter from './Typewriter';
// import HeroReact from '../../assets/hero_react.svg';

// import { useGetLatestProjectsQuery } from '../../app/services/projectApi';

import Hero from '../../components/Hero/Hero';

import './Home.scss';

export default function Home() {
  // const { data, error, isLoading } = useGetLatestProjectsQuery(null);

  return (
    <main className="home__main">
      <Login />
      <Register />
      <Hero />
      {/* <div className="home__container">
        <div className="home__hero">
          <div className="home__hero-items">
            <Typewriter text="Hi, I'm Michelle." delay={100} />
            <p className="home__tagline">Freelance Web Developer. Tech Enthusiast. Cat Person.</p>
            <div>{isLoading ? 'loading' : 'finished'}</div>
          </div>
          <div className="home__hero-feature">
            <img src={HeroReact} alt="Hero Image" className="home__hero-image" />
          </div>
        </div>
      </div>
      <About /> */}
    </main>
  );
}
