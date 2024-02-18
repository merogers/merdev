import Main from '../components/Main';
import Container from '../components/Container';
import UserInfo from '../components/UserInfo';
import ProjectList from '../components/ProjectList';
import { useTypedSelector } from '../redux/store';
import Spinner from '../components/Spinner';

export default function Dashboard() {
  const { user } = useTypedSelector(state => state.auth);

  return (
    <Main height="min-h-min">
      <Container>
        <div className="flex gap-2 flex-col w-full my-0 md:my-8 h-full">
          <div className="flex w-full flex-col max-w-3xl mx-auto h-full">
            {user ? (
              <>
                <UserInfo />
                <ProjectList />
              </>
            ) : (
              <Spinner message="Loading..." />
            )}
          </div>
        </div>
      </Container>
    </Main>
  );
}
