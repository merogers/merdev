import Main from '../../components/Shared/Main';
import Container from '../../components/Shared/Container';
import LoginForm from '../../components/Form/Login';

export const metadata = {
  title: 'Login',
  description: 'Herp Derp',
};

export default function LoginPage() {
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
