import Main from '../components/Main';
import Container from '../components/Container';
import UserInfo from '../components/UserInfo';
import ProjectList from '../components/ProjectList';
// import { useTypedSelector } from '../redux/store';
import Spinner from '../components/Spinner';
import { useGetProjectsQuery } from '../redux/services/auth';

export default function Dashboard() {
  const { data: projects, isLoading } = useGetProjectsQuery();

  return (
    <Main height="min-h-min">
      <Container>
        <div className="flex gap-2 flex-col w-full my-0 md:my-8 h-full">
          <div className="flex w-full flex-col max-w-3xl mx-auto h-full">
            {isLoading ? (
              <Spinner message="Loading..." />
            ) : (
              <>
                <UserInfo projects={projects} />
                <ProjectList />
              </>
            )}
          </div>
        </div>
      </Container>
    </Main>
  );
}
