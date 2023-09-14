import React from 'react';
import Container from '@/components/Shared/Container';
import Main from '@/components/Shared/Main';
import User from '@/components/Dashboard/User';
import ProjectList from '@/components/Dashboard/ProjectList';

export const metadata = {
  title: 'New Project',
  description: 'Herp Derp',
};

export default function NewProjectPage() {
  return (
    <Main height="min-h-min">
      <Container>
        <div className="flex gap-2 flex-col w-full my-0 md:my-8">
          <div className="flex w-full flex-col max-w-3xl mx-auto">
            <User />
            <ProjectList />
          </div>
        </div>
      </Container>
    </Main>
  );
}
