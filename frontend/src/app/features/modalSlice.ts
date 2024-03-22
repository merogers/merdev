import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  login: boolean;
  register: boolean;
}

const initialState: ModalState = {
  login: false,
  register: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleLoginModal: (state) => {
      state.login = !state.login;
    },
    toggleRegisterModal: (state) => {
      state.register = !state.register;
    },
  },
});

export const { toggleLoginModal, toggleRegisterModal } = modalSlice.actions;

export default modalSlice.reducer;
