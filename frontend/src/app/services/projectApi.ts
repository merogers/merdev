import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { ProjectType } from '../../types/project';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
  endpoints: (builder) => ({
    getLatestProjects: builder.query<ProjectType[], null>({
      query: () => 'project',
    }),
  }),
});

export const { useGetLatestProjectsQuery } = projectApi;
