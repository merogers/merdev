import { H3 } from './Typography';

type SpinnerProps = {
  message: string;
};

export default function Spinner({ message }: SpinnerProps) {
  return (
    <div className="flex mx-auto h-full flex-col justify-center items-center md:mb-16">
      <div className="border-secondary-200 h-20 w-20 animate-spin rounded-full border-8 border-t-primary-200 mb-8" />
      <H3>{message}</H3>
    </div>
  );
}
