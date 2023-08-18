import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  password: string;
  email: string;
};

type InitialState = {
  user: User | null;
  authorizationToken: string;
};

type Payload = {
  user: User;
  authorizationToken: string;
};

const initialState = {
  user: null,
  authorizationToken: '',
} as InitialState;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: () => initialState,
    logIn: (state, action: PayloadAction<Payload>) => {
      state.user = action.payload.user;
      state.authorizationToken = action.payload.authorizationToken;
    },
  },
});

export const { logOut, logIn } = authSlice.actions;
export default authSlice.reducer;
