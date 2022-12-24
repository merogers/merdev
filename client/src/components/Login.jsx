import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { animateScroll as scroll } from 'react-scroll';

import Form from './Form/Form';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

import useForm from '../hooks/useForm';

import { toast } from 'react-toastify';

import { login, reset } from '../features/auth/authSlice';
import { closeModals } from '../features/modal/modalSlice';

export const initialLoginState = {
  email: '',
  password: '',
  emailError: false,
  passwordError: false,
};

function Login() {
  const [formData, setFormData] = useState(initialLoginState);

  const { loginModalOpen } = useSelector((state) => state.modals);

  const { email, password, emailError, passwordError } = formData;

  const { handleChange, validateEmailField, validateMinLengthField } =
    useForm(setFormData);

  const handleLoginCancel = () => {
    dispatch(closeModals());
    setFormData(initialLoginState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormData((prev) => ({
      ...prev,
      emailError: false,
      passwordError: false,
    }));

    const emailIsValid = validateEmailField({
      field: email,
      error: 'emailError',
      message: 'Must be a valid email',
    });

    const passwordIsValid = validateMinLengthField({
      field: password,
      minLength: 6,
      error: 'passwordError',
      message: 'Password must be at least 6 characters',
    });

    if (emailIsValid && passwordIsValid) {
      const userData = {
        email,
        password,
      };
      dispatch(login(userData));
      scroll.scrollToTop();
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
      dispatch(closeModals());
    }
    // Reset state
    dispatch(reset());
  }, [user, isError, isLoginSuccess, message, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Modal modal={loginModalOpen} closeModal={handleLoginCancel}>
      <Form onSubmit={handleSubmit}>
        <h1 className='form__h1'>Login</h1>
        <label className='form__label'>
          <span>Email</span>
          <input
            type='text'
            value={email}
            onChange={handleChange}
            name='email'
            className={`form__input${emailError ? ' form__input--error' : ''}`}
          />
        </label>
        <label className='form__label'>
          <span>Password</span>
          <input
            type='password'
            value={password}
            onChange={handleChange}
            name='password'
            className={`form__input${
              passwordError ? ' form__input--error' : ''
            }`}
          />
        </label>
        <div className='form__button-container'>
          <button className='form__button-lg-primary' type='submit'>
            Submit
          </button>
          <button
            className='form__button-lg-secondary'
            onClick={handleLoginCancel}
            type='button'
          >
            Cancel
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default Login;
