import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toast } from 'react-toastify';

import { register, reset } from '../features/auth/authSlice';

import Form from './Form/Form';
import Loader from './Loader/Loader';

function Register({ toggleRegisterModal }) {
  const [formData, setFormData] = useState({
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
  });

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
      setFormData({
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
      });
      toggleRegisterModal();
    }
    // Reset state
    dispatch(reset());
  }, [user, isError, isRegisterSuccess, message, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

    let ready = true;

    if (firstName.length === 0) {
      toast.error('First Name cannot be blank');
      setFormData((prev) => ({
        ...prev,
        firstNameError: true,
      }));
      ready = false;
    }

    if (lastName.length === 0) {
      toast.error('Last Name cannot be blank');
      setFormData((prev) => ({
        ...prev,
        lastNameError: true,
      }));
      ready = false;
    }

    if (email.length === 0 || !email.includes('@')) {
      toast.error('Email must be valid');
      setFormData((prev) => ({
        ...prev,
        emailError: true,
      }));
      ready = false;
    }

    if (password.length < 6) {
      toast.error('Password must be longer than 6 characters');
      setFormData((prev) => ({
        ...prev,
        passwordError: true,
      }));
      ready = false;
    }

    if (password !== confirmPassword || confirmPassword.length === 0) {
      toast.error('Passwords must match');
      setFormData((prev) => ({
        ...prev,
        confirmPasswordError: true,
      }));
      ready = false;
    }

    if (ready) {
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
          className={`form__input${passwordError ? ' form__input--error' : ''}`}
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
          onClick={toggleRegisterModal}
          type='button'
        >
          Cancel
        </button>
      </div>
    </Form>
  );
}

export default Register;
