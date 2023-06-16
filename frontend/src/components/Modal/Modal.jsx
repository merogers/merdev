import useScroll from '../../hooks/useScroll';

import './Modal.scss';

function Modal({ children, modal, closeModal }) {
  // Disables scrolling if model is showing
  useScroll(modal);

  // Only allows toggle on parent element
  const stopProp = (e) => {
    e.stopPropagation();
  };

  return (
    <div onClick={closeModal} className={`modal${modal ? ' modal--open' : ''}`}>
      <div className='modal__content' onClick={stopProp}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
