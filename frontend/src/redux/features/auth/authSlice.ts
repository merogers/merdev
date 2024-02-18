import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../services/auth';
import type { RootState } from '../../store';

type AuthState = {
  user: User | null;
  authorizationToken: string | null;
};

const initialState = {
  user: null,
  authorizationToken: '',
} as AuthState;

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, authorizationToken: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, authorizationToken } }: PayloadAction<{ user: User; authorizationToken: string }>,
    ) => {
      state.user = user;
      state.authorizationToken = authorizationToken;
    },
    // TODO: Fix
    logout: () => initialState,
  },
});

export const { setCredentials, logout } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
