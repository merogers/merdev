'use client';

import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { H2 } from '../Shared/Typography';
import Form, { FormFieldContainer, FormInput, FormLabel, LabelField } from './Form';
import Button from '../Shared/Button';
import { useLoginMutation } from '../../redux/features/auth/authApiSlice';
import { useAppSelector } from '../../redux/store';
import { setCredentials } from '../../redux/features/auth/authSlice';

export default function Login() {
  const [error, setError] = useState('');

  const emailRef = useRef<null | HTMLInputElement>(null);

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5).max(20),
  });

  // const { user, authorizationToken } = useAppSelector(state => state.auth);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  // Infer the type from already defined schema
  type loginSchemaType = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchemaType>({ resolver: zodResolver(loginSchema) });

  async function submitData(data: loginSchemaType) {
    setError('');
    try {
      const loginData = await login(data).unwrap();
      dispatch(setCredentials(loginData));
      router.push('/dashboard');
      if (loginData?.error?.status === 404) {
        setError('User not found');
      } else if (loginData?.error?.status === 401) {
        setError('Invalid Credentials');
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log(emailRef);
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  return (
    <Form onSubmit={handleSubmit(submitData)}>
      <div className="flex mt-4 justify-center">
        <H2>Login</H2>
      </div>
      <div className="my-4">
        <FormFieldContainer>
          <FormLabel title="Email" name="email" />
          <FormInput type="text" name="email" register={register} ref={emailRef} />
          {errors.email && <div className="mt-1 text-red-500 text-sm">{errors.email.message}</div>}
        </FormFieldContainer>
        <FormFieldContainer>
          <FormLabel title="Password" name="password" />
          <FormInput type="password" name="password" register={register} />
          {errors.password && <div className="mt-1 text-red-500 text-sm">{errors.password.message}</div>}
        </FormFieldContainer>

        <div className="mt-8 flex justify-center">
          <Button text={`${isLoading ? 'Loading' : 'Login'}`} isDisabled={isLoading} />
        </div>
      </div>
    </Form>
  );
}
