import React, { useState } from 'react';

const useLoginModal = () => {
  const [loginModal, setLoginModal] = useState(false);

  const toggleLoginModal = () => {
    setLoginModal((prev) => !prev);
  };

  return { loginModal, toggleLoginModal, setLoginModal };
};

export default useLoginModal;
