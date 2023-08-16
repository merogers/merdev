import Link from 'next/link';

type ButtonProps = {
  href: string;
  text: string;
  variant?: 'primary' | 'secondary';
};

const buttonStyle =
  'flex text-lg tracking-wide justify-center w-full py-3 px-4 rounded-sm text-secondary-50 uppercase transition-colors md:w-fit md:py-4 md:px-8 md:text-xl';

const buttonVariants = {
  primary: 'bg-primary-400 hover:bg-primary-300',
  secondary: 'bg-secondary-400 hover:bg-secondary-300',
};

export default function Button({ href, text, variant }: ButtonProps) {
  return (
    <button href={href} className={`${buttonStyle} ${variant ? buttonVariants[variant] : buttonVariants.secondary}`}>
      {text}
    </button>
  );
}

export function ButtonLink({ href, text, style }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`flex text-lg tracking-wide justify-center w-full py-3 px-4 ${background} rounded-sm text-secondary-50 uppercase hover:${hover} transition-colors md:w-fit md:py-4 md:px-8 md:text-xl`}
    >
      {text}
    </Link>
  );
}
