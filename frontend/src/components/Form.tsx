import { PropsWithChildren } from 'react';

type LabelFieldProps = {
  title: string;
  name: string;
  type: 'text' | 'password';
};

export function LabelField({ title, name, type }: LabelFieldProps) {
  return (
    <div className="flex w-full md:w-4/5 relative group mt-8 justify-center mx-auto">
      <input
        type={type}
        name={name}
        id={name}
        required
        className="w-full h-10 px-4 text-sm peer outline-none border-b-2 border-b-gray-300 focus:border-b-primary-200 text-secondary-300 transition-colors"
      />
      <label
        htmlFor={name}
        className="transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-base group-focus-within:text-sm peer-valid:text-sm group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0 
        group-focus-within:text-primary-200 peer-valid:text-primary-200 
        text-secondary-300 uppercase"
      >
        {title}
      </label>
    </div>
  );
}

export default function Form({ children }: PropsWithChildren) {
  return <form className="flex flex-col bg-white drop-shadow-lg p-4 gap-2 w-full">{children}</form>;
}
