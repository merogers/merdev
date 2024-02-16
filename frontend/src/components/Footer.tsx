import { GitHub, Linkedin, Facebook, Twitter } from 'react-feather';
import { Link } from 'react-router-dom';
import Container from './Container';
import { navLinks } from './Nav';
import IconLink from './IconLink';

interface FooterProps {
  title: string;
}

export default function Footer({ title = 'Dev Portfolio' }: FooterProps) {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer>
      <div className="flex bg-secondary-400 px-8 py-8  text-secondary-200 tracking-wide">
        <Container>
          <div className="flex flex-col lg:flex-row justify-between w-full items-center">
            <div className="uppercase text-lg font-medium">{title}</div>
            <ul className="flex flex-col md:flex-row py-8 lg:py-0">
              {navLinks.map(link => (
                <li className="flex justify-center" key={link.title}>
                  <Link
                    key={link.title}
                    to={link.href}
                    className="flex items-center text-sm hover:text-white transition-colors px-0 md:px-4 w-min h-12 uppercase"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pr-0 text-secondary-200 flex gap-2">
              <IconLink href="https://github.com/merogersdev/">
                <GitHub size={24} />
              </IconLink>
              <IconLink href="https://www.linkedin.com/in/michelleerogers/">
                <Linkedin size={24} />
              </IconLink>
              <IconLink href="https://www.facebook.com/merogersdev">
                <Facebook size={24} />
              </IconLink>
              <IconLink href="https://twitter.com/merogersdev">
                <Twitter size={24} />
              </IconLink>
            </div>
          </div>
        </Container>
      </div>

      <div className="bg-secondary-500 px-8 lg:px-0 py-2 text-secondary-200 text-sm">
        <Container>
          <div className="flex justify-center tracking-wide w-full">CONTENT COPYRIGHT &copy;{year}</div>
        </Container>
      </div>
    </footer>
  );
}
