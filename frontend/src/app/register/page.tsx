import Main from '../../components/Shared/Main';
import Container from '../../components/Shared/Container';
import Register from '../../components/Form/Register';

export const metadata = {
  title: 'Register',
  description: 'Herp Derp',
};

export default function RegisterPage() {
  return (
    <Main height="min-h-min">
      <Container>
        <div className="flex gap-2 flex-col w-full my-0 md:my-8">
          <div className="flex w-full max-w-xl mx-auto">
            <Register />
          </div>
        </div>
      </Container>
    </Main>
  );
}
