'use client';

import Container from './components/Container';
import ParticlesEffect from './components/ParticlesEffect';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <ParticlesEffect />
      <main className="flex px-8 lg:px-0 py-8 flex-1 relative min-h-[calc(100vh-5rem)]">
        <Container>
          <div className="flex flex-col items-center justify-center w-3/4 mx-auto">
            <h1 className="text-2xl font-semibold text-secondary-400 text-center md:text-left md:text-4xl">
              Hi, I'm <span className="text-primary-300">Michelle</span> and I'm a{' '}
              <span className="text-primary-300">Full-Stack Developer</span>
            </h1>
            <div className="flex gap-4 mt-16 flex-col md:flex-row w-full justify-center md:justify-start">
              <Link
                href="/projects"
                className="flex text-lg tracking-wide justify-center w-full py-3 px-4 bg-secondary-400 rounded-sm text-secondary-50 uppercase hover:bg-secondary-300 transition-colors md:w-fit md:py-4 md:px-8 md:text-xl"
              >
                View Projects
              </Link>
              <Link
                href="/"
                className="flex text-lg tracking-wide justify-center w-full py-3 px-4 bg-primary-300 rounded-sm text-secondary-50 uppercase hover:bg-primary-200 transition-colors md:w-fit md:py-4 md:px-8 md:text-xl"
              >
                Download Resume
              </Link>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
