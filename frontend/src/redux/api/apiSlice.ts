import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logIn, logOut } from '../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/v1',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.user.authorizationToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   let result = baseQuery(args, api, extraOptions);

//   if (result?.error?.originalStatus === 403) {
//     console.log('sending refresh token');
//     const refreshResult = await baseQuery('/refresh', api, extraOptions);
//     console.log(refreshResult);
//     if (refreshResult?.data) {
//       const { user } = api.getState().auth;
//       // store new token
//       api.dispatch(logIn({ ...refreshResult.data, user }));
//       // try query with new token
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(logOut);
//     }
//   }
//   return result;
// };

export const apiSlice = createApi({
  baseQuery,
  endpoints: builder => ({}),
});

export default apiSlice;
