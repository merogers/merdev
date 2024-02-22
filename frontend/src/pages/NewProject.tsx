import Main from '../components/Main';
import Container from '../components/Container';

import NewProjectForm from '../components/Forms/NewProject';

export default function Login() {
  return (
    <Main height="min-h-min">
      <Container>
        <div className="flex gap-2 flex-col w-full my-0 md:my-8">
          <div className="flex w-full mx-auto">
            <NewProjectForm />
          </div>
        </div>
      </Container>
    </Main>
  );
}
