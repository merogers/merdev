import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Form from './Form/Form';
import Loader from './Loader/Loader';

import { toast } from 'react-toastify';

import { login, reset } from '../features/auth/authSlice';

function Login({ toggleLoginModal }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    emailError: false,
    passwordError: false,
  });

  const { email, password, emailError, passwordError } = formData;

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setFormData((prev) => ({
      ...prev,
      emailError: false,
      passwordError: false,
    }));

    let ready = true;

    if (email.length === 0) {
      toast.error('Email cannot be blank');
      setFormData((prev) => ({
        ...prev,
        emailError: true,
      }));
      ready = false;
    }

    if (password.length < 6) {
      toast.error('Password cannot be blank');
      setFormData((prev) => ({
        ...prev,
        passwordError: true,
      }));
      ready = false;
    }

    if (ready) {
      const userData = {
        email,
        password,
      };
      dispatch(login(userData));
    }
  };

  const dispatch = useDispatch();

  const { user, isLoading, isError, isLoginSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isLoginSuccess) {
      toast.success(`User ${user.firstName} logged in!`);
      setFormData({
        email: '',
        password: '',
        emailError: false,
        passwordError: false,
      });
      toggleLoginModal();
    }
    // Reset state
    dispatch(reset());
  }, [user, isError, isLoginSuccess, message, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Form onSubmit={onSubmit}>
      <h1>Login</h1>
      <label className='form__label'>
        <span>Email</span>
        <input
          type='text'
          value={email}
          onChange={onChange}
          name='email'
          className={`form__input${emailError ? ' form__input--error' : ''}`}
        />
      </label>
      <label className='form__label'>
        <span>Password</span>
        <input
          type='password'
          value={password}
          onChange={onChange}
          name='password'
          className={`form__input${passwordError ? ' form__input--error' : ''}`}
        />
      </label>
      <div className='form__button-container'>
        <button className='form__button-lg-primary' type='submit'>
          Submit
        </button>
        <button
          className='form__button-lg-secondary'
          onClick={toggleLoginModal}
          type='button'
        >
          Cancel
        </button>
      </div>
    </Form>
  );
}

export default Login;
