import React, { useEffect } from 'react';

import Section from './Section/Section';
import Container from './Container/Container';
import Project from './Project/Project';

import { toast } from 'react-toastify';

// import useGetProjects from '../hooks/useGetProjects';

import Loader from './Loader/Loader';

import { getLatestProjects } from '../features/project/projectSlice';

import { useSelector, useDispatch } from 'react-redux';

const Projects = () => {
  const { latestProjects, isError, isLoading, message } = useSelector(
    (state) => state.projects
  );

  console.log(latestProjects);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getLatestProjects());
  }, []);

  if (isLoading) {
    return (
      <Section id='projects'>
        <Container>
          <h2 className='section__h2'>Latest Projects</h2>
          <Loader />;
        </Container>
      </Section>
    );
  }

  return (
    <Section id='projects'>
      <Container>
        <h2 className='section__h2'>Latest Projects</h2>
        {latestProjects &&
          latestProjects.map((project) => (
            <Project project={project} key={project.title} />
          ))}
      </Container>
    </Section>
  );
};

export default Projects;
