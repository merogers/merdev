'use client';

import { redirect } from 'next/navigation';
import React from 'react';
import { useAppSelector } from '@/redux/store';
import { ButtonLink } from '../Shared/Button';
import Card from '../Shared/Card';
import { H3 } from '../Shared/Typography';

export default function User() {
  const { user } = useAppSelector(state => state.auth);

  if (!user) redirect('/login');

  const projectCount = user?.projects?.length;

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
    </>
  );
}
