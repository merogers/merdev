import Link from 'next/link';
import Container from '../Shared/Container';
import Nav from './Nav';

interface HeaderProps {
  title: string;
}

export default function Header({ title = 'My Portfolio' }: HeaderProps) {
  return (
    <header className="flex bg-secondary-400 h-16 drop-shadow-lg z-10 tracking-wide">
      <Container>
        <Link
          href="/"
          className="flex items-center ml-4 px-4 lg:pl-0 lg:ml-0 uppercase h-16 text-secondary-200 hover:text-white transition-colors"
        >
          {title}
        </Link>
        <Nav />
      </Container>
    </header>
  );
}
