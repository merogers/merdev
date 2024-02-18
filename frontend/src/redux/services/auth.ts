import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  projects: [];
  refreshToken: string;
}

export interface UserResponse {
  user: User;
  authorizationToken: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/v1/',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.authorizationToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const api = createApi({
  baseQuery: baseQuery,
  tagTypes: ['User'],
  endpoints: builder => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: credentials => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<UserResponse, LoginRequest>({
      query: credentials => ({
        url: '/auth/',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.query<UserResponse, void>({
      query: () => ({
        url: '/token/logout',
        method: 'GET',
      }),
    }),
    refresh: builder.query<object, void>({
      query: () => ({
        url: '/token/refresh',
        method: 'GET',
      }),
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => 'protected',
    }),
  }),
});

export const { useLoginMutation, useProtectedMutation, useRegisterMutation, useLogoutQuery, useLazyRefreshQuery } = api;
