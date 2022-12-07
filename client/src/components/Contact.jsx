import React from 'react';

import Section from './Section/Section';
import Container from './Container/Container';
import Form from './Form/Form';

const Contact = () => {
  return (
    <Section id='contact'>
      <Container>
        <Form>
          <h2 className='section__h2'>Contact</h2>
          <label className='form__label'>
            <span>Name</span>
            <input type='text' className='form__input' />
          </label>
          <label className='form__label'>
            <span>Email</span>
            <input type='text' className='form__input' />
          </label>
          <label className='form__label'>
            <span>Message</span>
            <textarea className='form__input form__textarea'></textarea>
          </label>
          <div className='form__button-container'>
            <button className='form__button-lg-primary'>Submit</button>
          </div>
        </Form>
      </Container>
    </Section>
  );
};

export default Contact;
