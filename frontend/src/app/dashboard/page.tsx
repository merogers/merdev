import React from 'react';
import Container from '../../components/Shared/Container';
import Main from '../../components/Shared/Main';
import User from '../../components/Dashboard/User';

export default function DashboardPage() {
  return (
    <Main height="min-h-min">
      <Container>
        <div className="flex gap-2 flex-col w-full my-0 md:my-8">
          <div className="flex w-full flex-col max-w-3xl mx-auto">
            <User />
          </div>
        </div>
      </Container>
    </Main>
  );
}
