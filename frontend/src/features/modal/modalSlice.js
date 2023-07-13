import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginModalOpen: false,
  registerModalOpen: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.loginModalOpen = true;
      state.registerModalOpen = false;
    },
    toggleLoginModal: (state) => {
      state.loginModalOpen = !state.loginModalOpen;
      state.registerModalOpen = false;
    },
    openRegisterModal: (state) => {
      state.registerModalOpen = true;
      state.loginModalOpen = false;
    },
    toggleRegisterModal: (state) => {
      state.registerModalOpen = !state.loginModalOpen;
      state.loginModalOpen = false;
    },
    closeModals: () => initialState,
  },
});

export const {
  openLoginModal, toggleLoginModal, openRegisterModal, toggleRegisterModal, closeModals,
} = modalSlice.actions;

export default modalSlice.reducer;
