import { Navigate } from 'react-router-dom';

import { useTypedSelector } from '../redux/store';
import { ButtonLink } from './Button';
import Card from './Card';
import { H3 } from './Typography';

export default function UserInfo() {
  const { user } = useTypedSelector(state => state.auth);

  if (!user) <Navigate to="/login" />;

  const projectCount = user?.projects?.length;

  return (
    <>
      <div className="flex mb-8 flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0 text-xl md:text-2xl text-secondary-400 font-semibold">
          Welcome, {user?.firstName}
        </div>
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
              <ButtonLink variant="primary" href="/new-project" text="Create New Project" size="lg" />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
