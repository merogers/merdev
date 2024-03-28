import { createSlice } from '@reduxjs/toolkit';

export interface ThemeState {
  value: 'light' | 'dark';
}

const initialState: ThemeState = {
  value: 'light'
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.value = state.value === 'light' ? 'dark': 'light'
    },
    setLightTheme: (state) => {
      state.value = 'light'
    },
    setDarkTheme: (state) => {
      state.value = 'dark'
    },
  },
});

export const { toggleTheme, setLightTheme, setDarkTheme } = modalSlice.actions;

export default modalSlice.reducer;