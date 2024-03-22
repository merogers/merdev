import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  value: boolean;
}

const initialState: ModalState = {
  value: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.value = !state.value;
    },
    closeMenu: (state) => {
      state.value = false;
    },
    openMenu: (state) => {
      state.value = true;
    },
  },
});

export const { toggleMenu, closeMenu, openMenu } = modalSlice.actions;

export default modalSlice.reducer;
