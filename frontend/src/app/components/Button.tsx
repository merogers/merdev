import Link from 'next/link';

type ButtonProps = {
  href: string;
  background: string;
  hover: string;
  text: string;
};

export default function Button({ href, background, hover, text }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`flex text-lg tracking-wide justify-center w-full py-3 px-4 ${background} rounded-sm text-secondary-50 uppercase hover:${hover} transition-colors md:w-fit md:py-4 md:px-8 md:text-xl`}
    >
      {text}
    </Link>
  );
}
