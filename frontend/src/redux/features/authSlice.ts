import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  firstName: string;
  lastName: string;
  password: string;
  salt: string;
  email: string;
};

type AuthState = {
  isAuth: boolean;
  user: User | null;
};

type InitialState = {
  value: AuthState;
};

const initialState = {
  value: {
    isAuth: false,
    user: null,
  } as AuthState,
} as InitialState;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: () => initialState,
    logIn: (state, action: PayloadAction<User>) => {
      return {
        value: {
          isAuth: true,
          user: action.payload,
        },
      };
    },
  },
});

export const { logOut, logIn } = authSlice.actions;
export default authSlice.reducer;
