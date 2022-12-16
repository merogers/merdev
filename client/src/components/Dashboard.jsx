import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Section from './Section/Section';
import Container from './Container/Container';
import Form from './Form/Form';

import { createProject, getProjects } from '../features/project/projectSlice';

import useValidate from '../hooks/useForm';

const initialProjectState = {
  title: '',
  description: '',
  screenshot: null,
  codeUrl: '',
  demoUrl: '',
  tags: '',
  titleError: false,
  descriptionError: false,
  tagsError: false,
  codeUrlError: false,
  demoUrlError: false,
  screenshotError: false,
};

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { userProjects } = useSelector((state) => state.projects);

  const [formData, setFormData] = useState(initialProjectState);

  const {
    title,
    description,
    screenshot,
    codeUrl,
    demoUrl,
    tags,
    titleError,
    descriptionError,
    screenshotError,
    tagsError,
    codeUrlError,
    demoUrlError,
  } = formData;

  // Get validation functions from useValidate
  const { handleChange, handleFileChange, validateEmptyField, validateField } =
    useValidate(setFormData);

  const dispatch = useDispatch();

  // Submit Project
  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset Errors
    setFormData((prev) => ({
      ...prev,
      titleError: false,
      descriptionError: false,
      screenshotError: false,
      tagsError: false,
      codeUrlError: false,
      demoUrlError: false,
    }));

    // Validate Fields
    const titleIsValid = validateEmptyField({
      field: title,
      error: 'titleError',
      message: 'Title cannot be blank',
    });

    const descriptionIsValid = validateEmptyField({
      field: description,
      error: 'descriptionError',
      message: 'Description cannot be blank',
    });

    const demoUrlIsValid = validateEmptyField({
      field: demoUrl,
      error: 'demoUrlError',
      message: 'Demo URL cannot be blank',
    });

    const codeUrlIsValid = validateEmptyField({
      field: codeUrl,
      error: 'codeUrlError',
      message: 'Code URL cannot be blank',
    });

    const tagsIsValid = validateEmptyField({
      field: tags,
      error: 'tagsError',
      message: 'Tags cannot be blank',
    });

    const screenshotIsValid = validateField({
      field: tags,
      value: null,
      error: 'screenshotError',
      message: 'Please upload a screenshot',
    });

    // If no errors, create project
    if (
      titleIsValid &&
      descriptionIsValid &&
      demoUrlIsValid &&
      codeUrlIsValid &&
      tagsIsValid &&
      screenshotIsValid
    ) {
      const newProject = {
        screenshot,
        title,
        description,
        tags,
        codeUrl,
        demoUrl,
      };
      dispatch(createProject(newProject));
      setFormData(initialProjectState);
    }
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
          <div className='dashboard__container'>
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
                <textarea
                  name='description'
                  value={description}
                  onChange={handleChange}
                  className={`form__textarea form__input${
                    descriptionError ? ' form__input--error' : ''
                  }`}
                ></textarea>
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
                    screenshotError ? ' form__input--error' : ''
                  }`}
                />
              </label>
              <div className='form__button-container'>
                <button className='form__button-lg-primary' type='submit'>
                  Create
                </button>
              </div>
            </Form>
          </div>
        </Container>
      </Section>
    )
  );
};

export default Dashboard;
