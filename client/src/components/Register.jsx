import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toast } from 'react-toastify';

import { register, reset } from '../features/auth/authSlice';

import Form from './Form/Form';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

import useForm from '../hooks/useForm';

const initialRegisterState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  firstNameError: false,
  lastNameError: false,
  emailError: false,
  passwordError: false,
  confirmPasswordError: false,
};

function Register({ registerModal, setRegisterModal }) {
  const [formData, setFormData] = useState(initialRegisterState);

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    firstNameError,
    lastNameError,
    emailError,
    passwordError,
    confirmPasswordError,
  } = formData;

  const {
    handleChange,
    validateEmailField,
    validateMinLengthField,
    validateEmptyField,
    validatePasswordsMatch,
  } = useForm(setFormData);

  const handleRegisterCancel = () => {
    setRegisterModal((prev) => !prev);
    setFormData(initialRegisterState);
  };

  const dispatch = useDispatch();

  const { user, isLoading, isError, isRegisterSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isRegisterSuccess) {
      toast.success('Registered user successfully');
      setFormData(initialRegisterState);
      setRegisterModal((prev) => !prev);
    }
    // Reset state
    dispatch(reset());
  }, [user, isError, isRegisterSuccess, message, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormData((prev) => ({
      ...prev,
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      passwordError: false,
      confirmPasswordError: false,
    }));

    const firstNameIsValid = validateEmptyField({
      field: firstName,
      error: 'firstNameError',
      message: 'You must enter a first name',
    });

    const lastNameIsValid = validateEmptyField({
      field: lastName,
      error: 'lastNameError',
      message: 'You must enter a last name',
    });

    const emailIsValid = validateEmailField({
      field: email,
      error: 'emailError',
      message: 'Must be a valid email',
    });

    const passwordIsValid = validateMinLengthField({
      field: password,
      minLength: 6,
      error: 'passwordError',
      message: 'Password must be longer than 6 characters',
    });

    const passwordsMatch = validatePasswordsMatch({
      password,
      confirmPassword,
      error: 'confirmPasswordError',
      message: 'Passwords do not match, or are blank',
    });

    if (
      firstNameIsValid &&
      lastNameIsValid &&
      emailIsValid &&
      passwordIsValid &&
      passwordsMatch
    ) {
      const userData = {
        firstName,
        lastName,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Modal
      modal={registerModal}
      setModal={setRegisterModal}
      handleCancel={handleRegisterCancel}
    >
      <Form onSubmit={handleSubmit}>
        <h1 className='form__h1'>Register</h1>
        <div className='form__field-container'>
          <label htmlFor='firstName' className='form__label--mr'>
            <span>First Name</span>
            <input
              name='firstName'
              type='text'
              onChange={handleChange}
              value={firstName}
              className={`form__input${
                firstNameError ? ' form__input--error' : ''
              }`}
            />
          </label>
          <label htmlFor='firstName' className='form__label'>
            <span>Last Name</span>
            <input
              name='lastName'
              type='text'
              onChange={handleChange}
              value={lastName}
              className={`form__input${
                lastNameError ? ' form__input--error' : ''
              }`}
            />
          </label>
        </div>
        <label htmlFor='email' className='form__label'>
          <span>Email</span>
          <input
            name='email'
            type='text'
            onChange={handleChange}
            value={email}
            className={`form__input${emailError ? ' form__input--error' : ''}`}
          />
        </label>

        <label htmlFor='password' className='form__label'>
          <span>Password</span>
          <input
            name='password'
            type='password'
            onChange={handleChange}
            value={password}
            className={`form__input${
              passwordError ? ' form__input--error' : ''
            }`}
          />
        </label>
        <label htmlFor='password' className='form__label'>
          <span>Confirm Password</span>
          <input
            name='confirmPassword'
            type='password'
            onChange={handleChange}
            value={confirmPassword}
            className={`form__input${
              confirmPasswordError ? ' form__input--error' : ''
            }`}
          />
        </label>

        <div className='form__button-container'>
          <button className='form__button-lg-primary' type='submit'>
            Submit
          </button>
          <button
            className='form__button-lg-secondary'
            onClick={handleRegisterCancel}
            type='button'
          >
            Cancel
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default Register;
