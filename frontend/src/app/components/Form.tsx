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
  return <input placeholder={placeholder} name={name} />;
}
export function TextareaField({ children, placeholder, name }: TextAreaProps) {
  return (
    <textarea placeholder={placeholder} name={name}>
      {children}
    </textarea>
  );
}

export default function Form({ children }: PropsWithChildren) {
  return <form className="flex flex-col">{children}</form>;
}
