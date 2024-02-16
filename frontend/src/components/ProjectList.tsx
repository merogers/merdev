'use client';

import { ProjectModel } from '../models/Project';
import { useAppSelector } from '../redux/store';
import { H3 } from './Typography';
import Project from './Project';

export default function ProjectList() {
  const { user } = useAppSelector(state => state.auth);

  console.log(user);

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
      <div className="flex items-center justify-center mt-16">
        <H3>Project List</H3>
      </div>
      <div className="flex flex-col mt-4 gap-8">
        <Project project={testProject} />
      </div>
    </>
  );
}
