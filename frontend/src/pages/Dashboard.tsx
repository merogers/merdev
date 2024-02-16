import Main from '../components/Main';
import Container from '../components/Container';
import User from '../components/UserInfo';
import ProjectList from '../components/ProjectList';

export default function Dashboard() {
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
