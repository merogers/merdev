import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Section from './Section/Section';
import Container from './Container/Container';
import Form from './Form/Form';

import { createProject, getProjects } from '../features/project/projectSlice';
import { useEffect } from 'react';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { userProjects } = useSelector((state) => state.projects);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    screenshot: null,
    codeUrl: '',
    demoUrl: '',
    tags: '',
    titleError: false,
    descriptionError: false,
    bodyError: false,
    tagsError: false,
    codeUrlError: false,
    demoUrlError: false,
  });

  const {
    title,
    description,
    screenshot,
    codeUrl,
    demoUrl,
    tags,
    titleError,
    descriptionError,
    bodyError,
    tagsError,
    codeUrlError,
    demoUrlError,
  } = formData;

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      screenshot,
      title,
      description,
      tags,
      codeUrl,
      demoUrl,
    };

    dispatch(createProject(newProject));
  };

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  return (
    user && (
      <Section id='dashboard' isDash={true}>
        <Container>
          <h1 className='section__h1 section__h1--centered'>
            Hi, {user.firstName}
          </h1>
          <p className='section__p section__p--centered'>
            Total Projects: {userProjects.length}
          </p>
          <Form onSubmit={handleSubmit}>
            <h2 className='form__h2'>Create New Project</h2>

            <label className='form__label'>
              <span>Title</span>
              <input
                type='text'
                value={title}
                onChange={handleChange}
                name='title'
                className={`form__input${
                  titleError ? ' form__input--error' : ''
                }`}
              />
            </label>
            <label className='form__label'>
              <span>Description</span>
              <input
                type='text'
                value={description}
                onChange={handleChange}
                name='description'
                className={`form__input${
                  descriptionError ? ' form__input--error' : ''
                }`}
              />
            </label>

            <label className='form__label'>
              <span>Full Demo URL (include https://)</span>
              <input
                type='text'
                value={demoUrl}
                onChange={handleChange}
                name='demoUrl'
                className={`form__input${
                  demoUrlError ? ' form__input--error' : ''
                }`}
              />
            </label>
            <label className='form__label'>
              <span>Full Code URL (include https://)</span>
              <input
                type='text'
                value={codeUrl}
                onChange={handleChange}
                name='codeUrl'
                className={`form__input${
                  codeUrlError ? ' form__input--error' : ''
                }`}
              />
            </label>
            <label className='form__label'>
              <span>Tech Tags (Separate with space)</span>
              <input
                type='text'
                value={tags}
                onChange={handleChange}
                name='tags'
                className={`form__input${
                  tagsError ? ' form__input--error' : ''
                }`}
              />
            </label>
            <label className='form__label'>
              <span>Screenshot</span>
              <input
                type='file'
                onChange={handleFileChange}
                name='screenshot'
                className={`form__input${
                  bodyError ? ' form__input--error' : ''
                }`}
              />
            </label>
            <div className='form__button-container'>
              <button className='form__button-lg-primary' type='submit'>
                Create
              </button>
            </div>
          </Form>
        </Container>
      </Section>
    )
  );
};

export default Dashboard;
