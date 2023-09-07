import { BaseQueryApi, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logOut, setCredentials } from '../features/auth/authSlice';
import type { RootState } from '../store';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/v1',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.authorizationToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  // ! fix any
  let result: any = baseQuery(args, api, extraOptions);

  const status = result?.error?.originalStatus;

  if (status === 401 || status === 403) {
    const refreshResult = await baseQuery('/token/refresh', api, extraOptions);
    if (refreshResult?.data) {
      // store new token
      api.dispatch(setCredentials({ ...refreshResult.data }));
      // try query with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut);
    }
  }
  return result;
};

const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    // --- Auth --- //
    login: builder.mutation({
      query: credentials => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: credentials => ({
        url: '/auth',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    // --- Token --- //
    refresh: builder.query<{}, void>({
      query: () => ({
        url: '/token/refresh',
        method: 'GET',
      }),
    }),
    logout: builder.query<{}, void>({
      query: () => ({
        url: '/token/logout',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshQuery, useRegisterMutation, useLogoutQuery } = apiSlice;

export default apiSlice;
