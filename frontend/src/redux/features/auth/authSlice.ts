import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserModel } from '@/models/User';

export type InitialState = {
  user: UserModel | null;
  authorizationToken: string;
};

export type Payload = {
  user: UserModel;
  authorizationToken: string;
};

const initialState = {
  user: null,
  authorizationToken: '',
} as InitialState;

type SetCredentialsAction<P = void, T extends string = string, M = never, E = never> = {
  payload: P;
  type: T;
} & ([M] extends [never]
  ? Payload
  : {
      meta: M;
    }) &
  ([E] extends [never]
    ? {}
    : {
        error: E;
      });

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: () => initialState,
    setCredentials: (state, action: PayloadAction<SetCredentialsAction>) => {
      state.user = action.payload.user;
      state.authorizationToken = action.payload.authorizationToken;
    },
  },
});

export const { logOut, setCredentials } = authSlice.actions;
export default authSlice.reducer;
