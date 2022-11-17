import React from 'react';

import './Form.scss';

const Form = ({ children, onSubmit }) => {
  return (
    <form className='form' onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
