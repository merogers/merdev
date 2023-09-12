'use client';

import { redirect } from 'next/navigation';
import React from 'react';
import { useAppSelector } from '@/redux/store';
import { ButtonLink } from '../Shared/Button';
import Card from '../Shared/Card';
import { H3 } from '../Shared/Typography';
import Project from './Project';
import { ProjectModel } from '@/models/Project';

export default function User() {
  const { user } = useAppSelector(state => state.auth);

  if (!user) redirect('/login');

  const projectCount = user?.projects?.length;

  const testProject: ProjectModel = {
    screenshotUrl: 'https://storage.googleapis.com/my-screenshots-391716/gla-firebase-screen-lg.png',
    screenshotFile: 'gla-firebase-screen-lg.png',
    userid: '63aa19031f80e596a162eea7',
    title: 'Grocery List App',
    description:
      'This app was meant to test React and Firebase as an alternative to MERN stack but turned out to be very useful as a day-to-day app. Learned about using Firebase as a cost-effective database for small projects. Main pain point was learning how to use reducers and the React useReducer hook effectively.',
    demoUrl: 'https://gla.michellerogers.ca/',
    codeUrl: 'https://github.com/merogersdev/gla-firebase',
    tags: ['HTML5', 'SASS', 'JavaScript', 'React', 'Vite', 'Firebase', 'Google Cloud', 'Docker'],
    createdAt: new Date('2022-12-27T00:07:28.901+00:00'),
    updatedAt: new Date('2023-07-10T19:13:31.082+00:00'),
  };

  return (
    <>
      <div className="flex mb-8 flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0 text-xl md:text-2xl text-secondary-400 font-semibold">
          Welcome, {user?.firstName}
        </div>
        <ButtonLink href="/logout" text="Logout" size="lg" />
      </div>
      <Card>
        <div className="flex flex-col p-4 w-full">
          <div className="flex justify-between border-b-2 border-b-secondary-100 pb-2">
            <H3>My Projects </H3>
            <H3>({projectCount})</H3>
          </div>
          <div className="mt-4 flex flex-col w-full">
            <div className="flex flex-col md:flex-row justify-between items-center w-full py-4 gap-2">
              {projectCount === 0 ? (
                <span>You have no projects yet.</span>
              ) : (
                <span>
                  You have ${projectCount} project${projectCount && projectCount > 1 && 's'}!
                </span>
              )}
              <ButtonLink variant="primary" href="/dashboard" text="Create New Project" size="lg" />
            </div>
          </div>
        </div>
      </Card>
      {projectCount !== undefined && projectCount > 0 && (
        <>
          <div className="flex items-center justify-center mt-16">
            <H3>Project List</H3>
          </div>
          <div className="flex flex-col mt-4 gap-8">
            <Project project={testProject} />
          </div>
        </>
      )}
    </>
  );
}
