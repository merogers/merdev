import Main from '../components/Main';
import Container from '../components/Container';
import RegisterForm from '../components/Forms/RegisterForm';

export default function Register() {
  return (
    <Main height="min-h-min">
      <Container>
        <div className="flex gap-2 flex-col w-full my-0 md:my-8">
          <div className="flex w-full max-w-xl mx-auto">
            <RegisterForm />
          </div>
        </div>
      </Container>
    </Main>
  );
}
