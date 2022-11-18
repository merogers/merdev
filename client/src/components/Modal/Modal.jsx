import React from 'react';
import PropTypes from 'prop-types';

import './Modal.scss';

// Framer Motion for Animations
import { motion, AnimatePresence } from 'framer-motion';

function Modal({ children, show, toggle }) {
  // Only allows toggle on parent element
  const stopProp = (e) => {
    e.stopPropagation();
  };

  return show ? (
    <AnimatePresence>
      <motion.div
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div onClick={() => toggle()} className="modal">
          <div className="modal__content" onClick={stopProp}>
            {children}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  ) : null;
}

Modal.propTypes = {
  children: PropTypes.node,
  show: PropTypes.boolean,
  toggle: PropTypes.function
};

Modal.defaultProps = {
  children: {},
  show: false,
  toggle: function()
};

export default Modal;
