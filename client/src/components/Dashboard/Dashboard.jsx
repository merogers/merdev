import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProjectForm from './ProjectForm';
import Section from '../Section/Section';
import Container from '../Container/Container';

import ProjectListing from '../ProjectListing/ProjectListing';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';

import {
  getUserProjects,
  deleteUserProject,
} from '../../features/project/userProjectSlice';

const initialProjectState = {
  title: '',
  description: '',
  screenshot: null,
  screenshotUrl: null,
  codeUrl: '',
  demoUrl: '',
  tags: '',
  _id: null,
  titleError: false,
  descriptionError: false,
  tagsError: false,
  codeUrlError: false,
  demoUrlError: false,
  screenshotError: false,
};

const Dashboard = () => {
  const [formData, setFormData] = useState(initialProjectState);

  const { user } = useSelector((state) => state.auth);

  const { userProjects, isLoading, isError, message } = useSelector(
    (state) => state.userProjects
  );

  const dispatch = useDispatch();

  const handleCancel = () => {
    setFormData(initialProjectState);
  };
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getUserProjects());
  }, [user, message, dispatch, isError]);

  if (isLoading) {
    return (
      <Section id='dashboard' isDash={true}>
        <Container>
          <Loader />
        </Container>
      </Section>
    );
  }

  return (
    <Section id='dashboard' isDash={true}>
      <Container>
        <h1 className='section__h1 section__h1--centered'>
          Hi, {user.firstName}
        </h1>
        <p className='section__p section__p--centered'>
          Your Projects: {userProjects.length}
        </p>

        {userProjects.length > 0 ? (
          <ul className='section__project-list'>
            {userProjects &&
              userProjects.map((project) => (
                <ProjectListing
                  key={project._id}
                  project={project}
                  deleteProject={deleteUserProject}
                  setFormData={setFormData}
                />
              ))}
          </ul>
        ) : (
          <h3 className='section__h3'>You have no projects...</h3>
        )}

        <div className='dashboard__container'>
          <ProjectForm
            formData={formData}
            setFormData={setFormData}
            handleCancel={handleCancel}
          />
        </div>
      </Container>
    </Section>
  );
};

export default Dashboard;
