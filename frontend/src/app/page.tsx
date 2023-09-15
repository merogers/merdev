import Main from '@/components/Shared/Main';
import Container from '@/components/Shared/Container';
import { ButtonLink } from '@/components/Shared/Button';
import Spinner from '@/components/Shared/Spinner';

export const metadata = {
  title: 'My Portfolio',
  description: 'Herp Derp',
};

export default function HomePage() {
  return (
    <Main minHeight="min-h-[30rem]" height="h-[calc(100vh-5rem)]">
      <Container>
        <div className="flex flex-col items-center justify-center w-3/4 mx-auto h-full">
          <h1 className="text-2xl font-semibold text-secondary-400 text-center md:text-left md:text-4xl">
            Hi, I&apos;m
            <span className="text-primary-300">Michelle</span>
            and I&apos;m a<span className="text-primary-300"> Full-Stack Developer</span>
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
