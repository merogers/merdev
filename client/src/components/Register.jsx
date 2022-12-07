import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toast } from 'react-toastify';

import { register, reset } from '../features/auth/authSlice';

import Form from './Form/Form';

function Register({ toggleRegisterModal }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (isError) {
  //     toast.error(message);
  //   }
  //   if (isSuccess || user) {
  //     navigate('/dashboard');
  //   }
  //   // Reset state
  //   dispatch(reset());
  // }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let ready = true;

    console.log(formData);

    if (firstName.length === 0) {
      toast.error('First Name cannot be blank');
      ready = false;
    }

    if (lastName.length === 0) {
      toast.error('Last Name cannot be blank');
      ready = false;
    }

    if (email.length === 0 || !email.includes('@')) {
      toast.error('Email must be valid');
      ready = false;
    }

    if (password.length < 6) {
      toast.error('Password must be longer than 6 characters');
      ready = false;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords must match');
      ready = false;
    }

    if (ready) {
      toast.success('Registered user successfully');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    }
  };

  //! need password checks

  const userData = {};

  // dispatch(register(userData));

  // if (isLoading) {
  //   return <h1>Loading...</h1>;
  // }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <label htmlFor='firstName' className='form__label'>
        <span>First Name</span>
        <input
          name='firstName'
          type='text'
          onChange={handleChange}
          value={firstName}
          placeholder='First Name'
          className='form__input'
        />
      </label>
      <label htmlFor='firstName' className='form__label'>
        <span>Last Name</span>
        <input
          name='lastName'
          type='text'
          onChange={handleChange}
          value={lastName}
          placeholder='Last Name'
          className='form__input'
        />
      </label>
      <label htmlFor='email' className='form__label'>
        <span>Email</span>
        <input
          name='email'
          type='text'
          onChange={handleChange}
          value={email}
          placeholder='Email'
          className='form__input'
        />
      </label>
      <label htmlFor='password' className='form__label'>
        <span>Password</span>
        <input
          name='password'
          type='password'
          onChange={handleChange}
          value={password}
          className='form__input'
        />
      </label>
      <label htmlFor='password' className='form__label'>
        <span>Confirm Password</span>
        <input
          name='confirmPassword'
          type='password'
          onChange={handleChange}
          value={confirmPassword}
          className='form__input'
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
