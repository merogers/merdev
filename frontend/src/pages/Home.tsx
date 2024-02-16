import Main from '../components/Main';
import { ButtonLink } from '../components/Button';
import Spinner from '../components/Spinner';
import Container from '../components/Container';

export default function Home({ name = 'Jim', title = 'Developer' }) {
  return (
    <Main minHeight="min-h-[30rem]" height="h-[calc(100vh-5rem)]">
      <Container>
        <div className="flex flex-col items-center justify-center w-3/4 mx-auto h-full">
          <h1 className="text-2xl font-semibold text-secondary-400 text-center md:text-left md:text-4xl">
            Hi, I&apos;m
            <span className="text-primary-300 px-2">{name}</span>
            and I&apos;m a<span className="text-primary-300 px-2">{title}</span>
          </h1>
          <div className="flex gap-4 mt-16 flex-col md:flex-row w-full justify-center md:justify-start">
            <ButtonLink href="/projects" text="View Projects" size="lg" />
            <ButtonLink href="/" variant="primary" text="Download Resume" size="lg" />
          </div>
          <Spinner />
        </div>
      </Container>
    </Main>
  );
}
