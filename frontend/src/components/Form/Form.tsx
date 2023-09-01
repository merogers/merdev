import { ReactNode, useEffect, useRef, forwardRef, MutableRefObject } from 'react';
import { FieldError } from 'react-hook-form';
import { Node } from '../../types';

type LabelProps = {
  title: string;
  name: string;
};

type InputProps = {
  type: 'text' | 'password';
  name: string;
  error?: FieldError | null;
  register: any;
};

type FormProps = {
  children: ReactNode;
  onSubmit: any;
};

type ErrorMessageProps = {
  text: string | undefined;
};

export function Label({ name, title }: LabelProps) {
  return (
    <label htmlFor={name} className="text-secondary-500 uppercase mt-8">
      {title}
    </label>
  );
}

export const Input = ({ type, name, error, register }: InputProps) => (
  <input
    type={type}
    id={name}
    {...register(name)}
    className={`w-full h-8 text-sm peer outline-none border-b-2 text-secondary-300 ${
      error ? 'border-b-red-500' : ' border-b-gray-300 focus:border-b-primary-200 '
    }  transition-colors`}
  />
);

Input.displayName = 'Form Input';

export function ErrorMessage({ text }: ErrorMessageProps) {
  return <div className="mt-1 text-red-500 text-sm">{text}</div>;
}

export default function Form({ children, onSubmit }: FormProps) {
  return (
    <form className="flex flex-col bg-white drop-shadow-lg p-4 gap-2 w-full" onSubmit={onSubmit}>
      {children}
    </form>
  );
}
