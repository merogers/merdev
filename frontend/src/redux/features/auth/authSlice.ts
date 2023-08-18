import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  password: string;
  email: string;
};

type InitialState = {
  user: User | null;
  token: string;
};

const initialState = {
  user: null,
  token: '',
} as InitialState;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: () => initialState,
    logIn: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { logOut, logIn } = authSlice.actions;
export default authSlice.reducer;
