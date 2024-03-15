import React from 'react';

import Container from '../Container/Container';

import './About.scss';

const About = () => {
  return (
    <section className="about">
      <div className="about__mask">
        <Container>
          <h2 className="section__h2">About</h2>
          <p className="section__p">
            The combination of creative design and technical problem solving is what led me to web development.
          </p>
          <p className="section__p">
            I originally started coding websites while I was in high-school and after enrolled a diploma program in
            development and e-commerce. Once complete, I started my own freelance development and IT business offering
            primarily Website design/development and IT Support services.
          </p>
          <p className="section__p">
            From there, I worked the last several years as a cook at various establishments to make ends meet. However,
            I've recently completed the Web Development bootcamp at Brainstation and have been working hard to improve
            my skills since. Now that I'm back up to speed in the ever-changing world of development I am again offering
            my services as a freelance web developer.
          </p>
          <p className="section__p">
            Feel free to send me a message if you want to take your website or web application to the next level
          </p>
        </Container>
      </div>
    </section>
  );
};

export default About;
