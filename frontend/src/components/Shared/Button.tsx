import Link from 'next/link';

type ButtonProps = {
  href: string;
  text: string;
  variant?: 'primary' | 'secondary';
};

type ButtonLinkProps = {
  text: string;
  variant?: 'primary' | 'secondary';
};

// Store core style and variant strings, instead of the component for better readability
const buttonStyles = {
  core: 'flex text-lg tracking-wide justify-center w-full py-3 px-4 rounded-sm text-secondary-50 uppercase transition-colors md:w-fit md:py-4 md:px-8 md:text-xl',
  primary: 'bg-primary-400 hover:bg-primary-300',
  secondary: 'bg-secondary-400 hover:bg-secondary-300',
};

// Submit button for forms
export default function Button({ text, variant }: ButtonLinkProps) {
  const { core, secondary } = buttonStyles;
  return (
    <button type="submit" className={`${core} ${variant ? buttonStyles[variant] : secondary}`}>
      {text}
    </button>
  );
}

// Next.js Routing Link Buttons
export function ButtonLink({ href, text, variant }: ButtonProps) {
  const { core, secondary } = buttonStyles;
  return (
    <Link href={href} className={`${core} ${variant ? buttonStyles[variant] : secondary}`}>
      {text}
    </Link>
  );
}
