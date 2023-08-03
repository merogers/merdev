import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface LatestProjectType {
  codeUrl: string;
  createdAt: Date;
  demoUrl: string;
  description: string;
  screenshotFile: string;
  screenshotUrl: string;
  tags: string[];
  title: string;
  updatedAt: Date;
  userid: string;
  _id: string;
}

export type LatestProjects = {
  LatestProjects: LatestProjectType[];
};

export const api = createApi({
  reducerPath: '/',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1/' }),
  endpoints: builder => ({
    getProjects: builder.query<LatestProjects, LatestProjectType>({
      query: () => 'project/',
    }),
  }),
});

export const { useGetProjectsQuery } = api;
