import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  password: string;
  email: string;
  firstName?: string;
  lastName?: string;
};

export type InitialState = {
  user: User | null;
  authorizationToken: string;
};

export type Payload = {
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
    // ! Fix any
    setCredentials: (state, action: PayloadAction<any>) => {
      state.user = action.payload.user;
      state.authorizationToken = action.payload.authorizationToken;
    },
  },
});

export const { logOut, setCredentials } = authSlice.actions;
export default authSlice.reducer;
