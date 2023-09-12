'use client';

import { redirect } from 'next/navigation';
import React from 'react';
import { useAppSelector } from '@/redux/store';
import { ButtonLink } from '../Shared/Button';
import Card from '../Shared/Card';
import { H3, H4, LinkText } from '../Shared/Typography';

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
        <ButtonLink variant="primary" href="/dashboard" text="Create New Project" />
      </div>
      <Card>
        <div className="flex flex-col p-4 w-full">
          <div className="flex justify-between border-b-2 border-b-secondary-100 pb-2">
            <H3>My Projects </H3>
            <H3>({projectCount})</H3>
          </div>
          <div className="mt-4 flex flex-col w-full">
            {projectCount === 0 ? (
              <div className="flex justify-center w-full py-4">
                You have no projects. <LinkText href="/"> Create one now!</LinkText>
              </div>
            ) : (
              <div>faff</div>
            )}
          </div>
        </div>
      </Card>
    </>
  );
}
