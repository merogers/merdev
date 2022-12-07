import React from 'react';

import Section from './Section/Section';
import Container from './Container/Container';
import Project from './Project/Project';

import projects from '../projects';

const Projects = () => {
  return (
    <Section id='projects'>
      <Container>
        <h2 className='section__h2'>Projects</h2>
        {projects &&
          projects.map((project) => (
            <Project project={project} key={project.title} />
          ))}
      </Container>
    </Section>
  );
};

export default Projects;
