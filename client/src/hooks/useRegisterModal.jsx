import { useState } from 'react';

const useRegisterModal = () => {
  const [registerModal, setRegisterModal] = useState(false);

  const toggleRegisterModal = () => {
    setRegisterModal((prev) => !prev);
  };

  return { registerModal, toggleRegisterModal, setRegisterModal };
};

export default useRegisterModal;
