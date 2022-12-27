import useValidate from '../../hooks/useForm';

import Form from '../Form/Form';
import { useDispatch } from 'react-redux';

import {
  createUserProject,
  updateUserProject,
} from '../../features/project/userProjectSlice';

const ProjectForm = ({ formData, setFormData, handleCancel }) => {
  const { handleChange, handleFileChange, validateEmptyField, validateField } =
    useValidate(setFormData);

  const dispatch = useDispatch();

  const {
    title,
    description,
    codeUrl,
    demoUrl,
    tags,
    _id,
    screenshot,
    screenshotUrl,
    titleError,
    descriptionError,
    screenshotError,
    tagsError,
    codeUrlError,
    demoUrlError,
  } = formData;

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
      field: screenshot,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData((prev) => ({
      ...prev,
      titleError: false,
      descriptionError: false,
      screenshotError: false,
      tagsError: false,
      codeUrlError: false,
      demoUrlError: false,
    }));

    if (!validateProject()) {
      return;
    }

    if (_id) {
      const updatedProject = {
        _id,
        title,
        description,
        tags,
        codeUrl,
        demoUrl,
        screenshotUrl,
      };

      dispatch(updateUserProject(updatedProject));
    } else {
      const newProject = {
        screenshot,
        title,
        description,
        tags,
        codeUrl,
        demoUrl,
      };

      dispatch(createUserProject(newProject));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className='form__h2'>
        {_id ? 'Edit Project' : 'Create New Project'}
      </h2>

      <label className='form__label'>
        <span>Title</span>
        <input
          type='text'
          value={title}
          onChange={handleChange}
          name='title'
          className={`form__input${titleError ? ' form__input--error' : ''}`}
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
          className={`form__input${demoUrlError ? ' form__input--error' : ''}`}
        />
      </label>
      <label className='form__label'>
        <span>Full Code URL (include https://)</span>
        <input
          type='text'
          value={codeUrl}
          onChange={handleChange}
          name='codeUrl'
          className={`form__input${codeUrlError ? ' form__input--error' : ''}`}
        />
      </label>
      <label className='form__label'>
        <span>Tech Tags (Comma Separated)</span>
        <input
          type='text'
          value={tags}
          onChange={handleChange}
          name='tags'
          className={`form__input${tagsError ? ' form__input--error' : ''}`}
        />
      </label>
      {!_id && (
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
      )}
      <div className='form__button-container'>
        <button className='form__button-lg-primary' type='submit'>
          {_id ? 'Update' : 'Create'}
        </button>
        {_id ? (
          <button
            className='form__button-lg-secondary'
            type='button'
            onClick={handleCancel}
          >
            Cancel
          </button>
        ) : null}
      </div>
    </Form>
  );
};

export default ProjectForm;
