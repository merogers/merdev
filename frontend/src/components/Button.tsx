import { Link } from 'react-router-dom';

type ButtonProps = {
  href: string;
  text: string;
  size: 'sm' | 'lg' | 'stretch';
  variant?: 'primary' | 'secondary' | 'cta';
};

type ButtonLinkProps = {
  text: string;
  size: 'sm' | 'lg' | 'stretch';
  variant?: 'primary' | 'secondary' | 'cta';
  isDisabled?: boolean;
};

// Store core style and variant strings, instead of the component for better readability
const buttonStyles = {
  core: 'flex tracking-wide justify-center rounded-sm text-secondary-50 uppercase transition-colors md:w-fit',
  sm: 'py-2 px-4 md:py-2 md:px-8 md:text-md w-fit',
  lg: 'text-lg py-2 px-4 md:py-2 md:px-8 md:text-xl',
  stretch: 'text-lg py-2 px-4 md:py-2 md:px-8 md:text-xl w-full md:w-full',
  primary: 'bg-primary-400 hover:bg-primary-300',
  secondary: 'bg-secondary-400 hover:bg-secondary-300',
  cta: 'bg-sky-600 hover:bg-sky-500',
};

// Submit button for forms
export default function Button({ text, variant, isDisabled, size }: ButtonLinkProps) {
  const { core, secondary, sm, lg, stretch } = buttonStyles;
  return (
    <button
      type="submit"
      className={`${core} ${variant ? buttonStyles[variant] : secondary} ${size === 'lg' && lg} ${
        size === 'sm' && sm
      } ${size === 'stretch' && stretch}`}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
}

// Next.js Routing Link Buttons
export function ButtonLink({ href, text, variant, size }: ButtonProps) {
  const { core, secondary, sm, lg, stretch } = buttonStyles;
  return (
    <Link
      to={href}
      className={`${core} ${size === 'lg' && lg} ${size === 'sm' && sm} ${size === 'stretch' && stretch} ${
        variant ? buttonStyles[variant] : secondary
      }`}
    >
      {text}
    </Link>
  );
}

// Normal Link to external source
export function ExternalLink({ href, text, variant, size }: ButtonProps) {
  const { core, secondary, sm, lg, stretch } = buttonStyles;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${core} ${size === 'lg' && lg} ${size === 'sm' && sm} ${size === 'stretch' && stretch} ${
        variant ? buttonStyles[variant] : secondary
      }`}
    >
      {text}
    </a>
  );
}
