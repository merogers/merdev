import React, { useState, useEffect } from 'react';

import Form from './Form/Form';

function Login({ toggleLoginModal }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

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
          className='form__input'
        />
      </label>
      <label className='form__label'>
        <span>Password</span>
        <input
          type='password'
          value={password}
          onChange={onChange}
          name='password'
          className='form__input'
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
