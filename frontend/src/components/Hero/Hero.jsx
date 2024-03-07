import React from 'react';

// import Section from '../Section/Section';
// import Container from '../Container/Container';

// import { Link } from 'react-scroll';

// import { FaAngleDoubleDown, FaFileDownload } from 'react-icons/fa';

import heroImage from '../../assets/hero.png';
import Typewriter from '../Typewriter';

import './Hero.scss';

const Hero = ({ title, tagline }) => {
  return (
    <section className="hero">
      <div className="hero__wave" />
      <div className="hero__image-overlay" />
      <img src={heroImage} alt="Hero Image" className="hero__image" />
      <div className="hero__feature">
        <Typewriter text={title} delay={100} />
        <p className="hero__p">{tagline}</p>
      </div>
    </section>
  );
  // return (

  //   <Section isDark={true} isHero={true} id="hero">
  //     <Container>
  //       <div className="section__hero-container">
  //         <img src={heroImage} alt="Hero Image" className="section__hero-image" />
  //         <div className="section__hero-content">
  //           <Typewriter text="Hi, I'm Michelle." delay={100} />
  //           <p className="section__p">Freelance Web Developer. Tech Enthusiast. Cat Person.</p>
  //           <div className="section__button-container">
  //             <Link
  //               className="section__button-lg-primary section__button-lg-primary--margin"
  //               to="projects"
  //               smooth={true}
  //               spy={true}
  //               offset={-64}
  //             >
  //               <FaAngleDoubleDown className="section__button-icon" />
  //               Projects
  //             </Link>
  //             <a
  //               className="section__button-lg-outline"
  //               href="https://storage.googleapis.com/my-resume-391716/michelle-rogers-resume-full-dev-latest.pdf"
  //               target="_blank"
  //               rel="noopener noreferrer"
  //             >
  //               <FaFileDownload className="section__button-icon" />
  //               Resume
  //             </a>
  //           </div>
  //         </div>
  //       </div>
  //     </Container>
  //   </Section>
  // );
};

export default Hero;
