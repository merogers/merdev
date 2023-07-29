import { PropsWithChildren, ReactNode } from 'react';

type FieldProps = {
  placeholder: string;
  name: string;
};

type TextAreaProps = {
  children?: ReactNode;
  placeholder: string;
  name: string;
};

export function Label({ children }: PropsWithChildren) {
  return <label>{children}</label>;
}

export function TextField({ placeholder, name }: FieldProps) {
  return (
    <input
      placeholder={placeholder}
      name={name}
      className="bg-secondary-50 py-2 px-4 outline-none border-b-secondary-200 border-b-4 focus:border-b-primary-300 text-primary-300 placeholder:text-gray-400 w-full"
    />
  );
}
export function TextareaField({ children, placeholder, name }: TextAreaProps) {
  return (
    <textarea
      placeholder={placeholder}
      name={name}
      className="bg-secondary-50 py-2 px-4 outline-none border-b-secondary-200 border-b-4 focus:border-b-primary-300 text-primary-300 placeholder:text-gray-400 resize-none w-full h-48"
    >
      {children}
    </textarea>
  );
}

export default function Form({ children }: PropsWithChildren) {
  return <form className="flex flex-col bg-white drop-shadow-lg p-4 gap-2">{children}</form>;
}
