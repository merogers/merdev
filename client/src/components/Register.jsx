import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { register, reset } from '../features/auth/authSlice';

import Form from './Form/Form';

const Register = () => {
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

  const navigate = useNavigate();
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
    <div>
      <Form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <label htmlFor='firstName'>
          <span>First Name</span>
          <input
            name='firstName'
            type='text'
            onChange={handleChange}
            value={firstName}
            placeholder='First Name'
          />
        </label>
        <label htmlFor='firstName'>
          <span>Last Name</span>
          <input
            name='lastName'
            type='text'
            onChange={handleChange}
            value={lastName}
            placeholder='Last Name'
          />
        </label>
        <label htmlFor='email'>
          <span>Email</span>
          <input
            name='email'
            type='text'
            onChange={handleChange}
            value={email}
            placeholder='Email'
          />
        </label>
        <label htmlFor='password'>
          <span>Password</span>
          <input
            name='password'
            type='password'
            onChange={handleChange}
            value={password}
          />
        </label>
        <label htmlFor='password'>
          <span>Confirm Password</span>
          <input
            name='confirmPassword'
            type='password'
            onChange={handleChange}
            value={confirmPassword}
          />
        </label>
        <button type='submit'>Submitty</button>
      </Form>
    </div>
  );
};

export default Register;
