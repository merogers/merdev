import React from 'react';
import PropTypes from 'prop-types';

import './Modal.scss';

function Modal({ children, show, toggle }) {
  // Only allows toggle on parent element
  const stopProp = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={() => toggle()}
      className={`modal${show ? ' modal--open' : ''}`}
    >
      <div className='modal__content' onClick={stopProp}>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  show: PropTypes.bool,
  toggle: PropTypes.func,
};

Modal.defaultProps = {
  children: {},
  show: false,
  toggle: function () {
    console.log('click');
  },
};

export default Modal;
