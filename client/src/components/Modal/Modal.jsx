import React from 'react';

import './Modal.scss';

// Framer Motion for Animations
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ children, show, toggle }) => {
  // Only allows toggle on parent element
  const stopProp = (e) => {
    e.stopPropagation();
  };

  return show ? (
    <AnimatePresence>
      <motion.div
        key='modal'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div onClick={() => toggle()} className='modal'>
          <div className='modal__content' onClick={stopProp}>
            {children}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  ) : null;
};

export default Modal;
