import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    openMenu: (state, _action) => {
      state.isOpen = true;
    },
    closeMenu: (state, _action) => {
      state.isOpen = false;
    },
    toggleMenu: (state, _action) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openMenu, closeMenu, toggleMenu } = menuSlice.actions;

export default menuSlice.reducer;
