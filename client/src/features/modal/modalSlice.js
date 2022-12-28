import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginModalOpen: false,
  registerModalOpen: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openLoginModal: (state, _action) => {
      state.loginModalOpen = true;
      state.registerModalOpen = false;
    },
    toggleLoginModal: (state, _action) => {
      state.loginModalOpen = !state.loginModalOpen;
      state.registerModalOpen = false;
    },
    openRegisterModal: (state, _action) => {
      state.registerModalOpen = true;
      state.loginModalOpen = false;
    },
    toggleRegisterModal: (state, _action) => {
      state.registerModalOpen = !state.loginModalOpen;
      state.loginModalOpen = false;
    },
    closeModals: (_state, _action) => initialState,
  },
});

export const {
  openLoginModal,
  toggleLoginModal,
  openRegisterModal,
  toggleRegisterModal,
  closeModals,
} = modalSlice.actions;

export default modalSlice.reducer;
