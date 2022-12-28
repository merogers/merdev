import React, { useState } from 'react';

import axios from 'axios';

const API_URL = `${import.meta.env.VITE_SERVER_URL}/api/email`;

import useValidate from '../hooks/useForm';

import Section from './Section/Section';
import Container from './Container/Container';
import Form from './Form/Form';

import { FaEnvelope } from 'react-icons/fa';
import Loader from './Loader/Loader';

import { toast } from 'react-toastify';

const initialContactState = {
  name: '',
  email: '',
  phone: '',
  emailMessage: '',
  nameError: false,
  emailError: false,
  phoneError: false,
  emailMessageError: false,
};

const Contact = () => {
  const [formData, setFormData] = useState(initialContactState);

  const { handleChange, validateEmptyField, validateEmailField } =
    useValidate(setFormData);

  const {
    name,
    email,
    phone,
    emailMessage,
    nameError,
    emailError,
    phoneError,
    emailMessageError,
  } = formData;

  const validateContactEmail = () => {
    // Validate Fields
    const nameIsValid = validateEmptyField({
      field: name,
      error: 'nameError',
      message: 'Name cannot be blank',
    });

    const emailIsValid = validateEmailField({
      field: email,
      error: 'emailError',
      message: 'Must be a valid email',
    });

    const phoneIsValid = validateEmptyField({
      field: phone,
      error: 'phoneError',
      message: 'Phone cannot be blank',
    });

    const messageIsValid = validateEmptyField({
      field: emailMessage,
      error: 'emailMessageError',
      message: 'Message cannot be blank',
    });

    // If no errors, create project
    if (nameIsValid && emailIsValid && phoneIsValid && messageIsValid) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormData((prev) => ({
      ...prev,
      nameError: false,
      emailError: false,
      phoneError: false,
      emailMessageError: false,
    }));

    if (!validateContactEmail()) {
      return;
    }

    const emailBody = {
      name,
      email,
      phone,
      message: emailMessage,
    };

    const response = await axios.post(API_URL, emailBody);

    if (response.status === 200) {
      toast.success('Message sent successfully');
      setFormData(initialContactState);
    } else {
      toast.error('Failed to send message. Please notify admin');
    }
  };

  return (
    <Section id='contact'>
      <Container>
        <Form onSubmit={handleSubmit}>
          <h2 className='section__h2'>Contact</h2>
          <label className='form__label'>
            <span>Name</span>
            <input
              type='text'
              value={name}
              onChange={handleChange}
              name='name'
              className={`form__input${nameError ? ' form__input--error' : ''}`}
            />
          </label>
          <label className='form__label'>
            <span>Email</span>
            <input
              type='text'
              value={email}
              onChange={handleChange}
              name='email'
              className={`form__input${
                emailError ? ' form__input--error' : ''
              }`}
            />
          </label>
          <label className='form__label'>
            <span>Phone</span>
            <input
              type='text'
              value={phone}
              onChange={handleChange}
              name='phone'
              className={`form__input${
                phoneError ? ' form__input--error' : ''
              }`}
            />
          </label>
          <label className='form__label'>
            <span>Message</span>
            <textarea
              name='emailMessage'
              value={emailMessage}
              onChange={handleChange}
              className={`form__textarea form__input${
                emailMessageError ? ' form__input--error' : ''
              }`}
            ></textarea>
          </label>
          <div className='form__button-container'>
            <button className='form__button-lg-primary'>
              <FaEnvelope className='form__button-icon' /> Submit
            </button>
          </div>
        </Form>
      </Container>
    </Section>
  );
};

export default Contact;
