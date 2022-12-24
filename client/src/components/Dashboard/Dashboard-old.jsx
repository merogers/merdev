import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Section from '../Section/Section';
import Container from '../Container/Container';
import Form from '../Form/Form';
import ProjectListing from '../ProjectListing/ProjectListing';
import Loader from '../Loader/Loader';

import {
  reset,
  getUserProjects,
  deleteUserProject,
} from '../../features/project/userProjectSlice';

import useValidate from '../../hooks/useForm';
import { toast } from 'react-toastify';

const initialProjectState = {
  title: '',
  description: '',
  screenshot: null,
  codeUrl: '',
  demoUrl: '',
  tags: '',
  _id: '',
  replaceScreenshot: true,
  titleError: false,
  descriptionError: false,
  tagsError: false,
  codeUrlError: false,
  demoUrlError: false,
  screenshotError: false,
};

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const { userProjects, isLoading, isError, message } = useSelector(
    (state) => state.userProjects
  );

  const [formData, setFormData] = useState(initialProjectState);

  const [editMode, setEditMode] = useState(false);

  const {
    title,
    description,
    screenshot,
    codeUrl,
    demoUrl,
    tags,
    _id,
    screenshotUrl,
    replaceScreenshot,
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

  const validateProject = () => {
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
      return true;
    } else {
      return false;
    }
  };

  // Submit Project
  const handleSubmitCreate = (e) => {
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

    if (validateProject()) {
      const newProject = {
        screenshot,
        title,
        description,
        tags,
        codeUrl,
        demoUrl,
      };
      toast.success('New Project Created Successfully');
      dispatch(createUserProject(newProject));
      setFormData(initialProjectState);
    }
  };

  const handleSubmitEdit = (e) => {
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

    if (validateProject()) {
      const updatedProject = {
        _id,
        screenshot,
        screenshotUrl,
        title,
        description,
        tags,
        codeUrl,
        demoUrl,
      };
      toast.success('Project Updated Successfully');
      dispatch(updateProject(updatedProject));
      setFormData(initialProjectState);
    }
    console.log(formData);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setFormData(initialProjectState);
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getUserProjects());

    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, dispatch]);

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
    user && (
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
                    setFormData={setFormData}
                    setEditMode={setEditMode}
                    deleteProject={deleteUserProject}
                  />
                ))}
            </ul>
          ) : (
            <h3 className='section__h3'>You have no projects...</h3>
          )}

          <div className='dashboard__container'>
            <Form onSubmit={editMode ? handleSubmitEdit : handleSubmitCreate}>
              <h2 className='form__h2'>
                {editMode ? 'Edit Project' : 'Create New Project'}
              </h2>

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
                {replaceScreenshot ? (
                  <input
                    type='file'
                    onChange={handleFileChange}
                    name='screenshot'
                    className={`form__input${
                      screenshotError ? ' form__input--error' : ''
                    }`}
                  />
                ) : null}
                {editMode ? (
                  <div>
                    <input
                      type='radio'
                      value={false}
                      checked={replaceScreenshot === false}
                      className='form__radio'
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          replaceScreenshot: false,
                        }))
                      }
                    />
                    <span>Keep Existing</span>
                    <input
                      type='radio'
                      value={true}
                      className='form__radio'
                      checked={replaceScreenshot === true}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          replaceScreenshot: true,
                        }))
                      }
                    />
                    <span>Replace</span>
                  </div>
                ) : null}
              </label>
              <div className='form__button-container'>
                <button className='form__button-lg-primary' type='submit'>
                  {editMode ? 'Edit' : 'Create'}
                </button>
                {editMode ? (
                  <button
                    className='form__button-lg-secondary'
                    type='submit'
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                ) : null}
              </div>
            </Form>
          </div>
        </Container>
      </Section>
    )
  );
};

export default Dashboard;
