import React, { useEffect } from 'react';

import Section from './Section/Section';
import Container from './Container/Container';
import Project from './Project/Project';
import Loader from './Loader/Loader';

import { toast } from 'react-toastify';

import {
  getLatestProjects,
  reset,
} from '../features/project/latestProjectSlice';

import { useSelector, useDispatch } from 'react-redux';

const Projects = () => {
  const { latestProjects, isLoading, isError } = useSelector(
    (state) => state.latestProjects
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLatestProjects());

    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error('Cannot fetch latest projects');
    }
  }, [isError]);

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
        {latestProjects.length > 0 ? (
          latestProjects &&
          latestProjects.map((project) => (
            <Project project={project} key={project.title} />
          ))
        ) : (
          <h3 className='section__h3'>Projects coming soon...</h3>
        )}
      </Container>
    </Section>
  );
};

export default Projects;
