import Container from './Container';
import Nav from './Nav';
import Link from 'next/link';

interface HeaderProps {
  title: string;
}

function Header({ title = 'My Portfolio' }: HeaderProps) {
  return (
    <header className="flex bg-secondary-100 text-white h-16 drop-shadow-lg z-10">
      <Container>
        <Link href="/" className="flex items-center ml-4 px-4 lg:pl-0 lg:ml-0 ">
          {title}
        </Link>
        <Nav />
      </Container>
    </header>
  );
}

export default Header;
