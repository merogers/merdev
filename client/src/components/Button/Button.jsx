import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = ({ text, type, onClick }) => {
  return (
    <button
      className={`button button${
        type === 'primary' ? '--primary' : '--secondary'
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  text: 'Submit',
  type: 'primary',
  onClick: (e) => {
    e.preventDefault();
    console.log('click');
  },
};

export default Button;
