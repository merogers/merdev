import { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

type LabelFieldProps = {
  title: string;
  name: string;
  type: 'text' | 'password';
  register: any;
  error: FieldError | undefined;
};

type formType = {
  children: ReactNode;
  onSubmit: any;
};

export function LabelField({ title, name, type, register, error }: LabelFieldProps) {
  return (
    <div className="w-full md:w-4/5 mx-auto">
      <div className="flex flex-col  relative group mt-8  ">
        <input
          type={type}
          name={name}
          id={name}
          {...register(name)}
          required
          className={`w-full h-10 px-4 text-sm peer outline-none border-b-2 text-secondary-300
          ${error ? 'border-b-red-500' : ' border-b-gray-300 focus:border-b-primary-200 '}  transition-colors`}
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
      {error && <div className="mt-1 text-red-500 text-sm">{error.message}</div>}
    </div>
  );
}

export default function Form({ children, onSubmit }: formType) {
  return (
    <form className="flex flex-col bg-white drop-shadow-lg p-4 gap-2 w-full" onSubmit={onSubmit}>
      {children}
    </form>
  );
}
