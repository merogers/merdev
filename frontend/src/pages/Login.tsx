import Main from '../components/Main';
import Container from '../components/Container';
import LoginForm from '../components/LoginForm';

export default function Login() {
  return (
    <Main height="min-h-min">
      <Container>
        <div className="flex gap-2 flex-col w-full my-0 md:my-8">
          <div className="flex w-full max-w-xl mx-auto">
            <LoginForm />
          </div>
        </div>
      </Container>
    </Main>
  );
}
