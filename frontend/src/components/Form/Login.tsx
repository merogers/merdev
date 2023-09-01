'use client';

import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { H2 } from '../Shared/Typography';
import Form, { Input, Label, ErrorMessage } from './Form';
import Button from '../Shared/Button';
import { useLoginMutation } from '../../redux/features/auth/authApiSlice';
import { setCredentials } from '../../redux/features/auth/authSlice';

export default function Login() {
  const [error, setError] = useState('');

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5).max(20),
  });

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  // Infer the type from already defined schema
  type loginSchemaType = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    setFocus,
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

  // React Hook form - Set focus on first field
  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  return (
    <Form onSubmit={handleSubmit(submitData)}>
      <div className="w-4/5 mx-auto flex flex-col items-center my-8">
        <H2>Login</H2>
        <div className="w-full my-8">
          <Label name="email" title="Email" />
          <Input type="text" name="email" error={errors.password} register={register} />
          {errors.email && <ErrorMessage text={errors.email.message} />}
        </div>
        <div className="w-full mb-12">
          <Label name="password" title="Password" />
          <Input type="password" name="password" error={errors.password} register={register} />
          {errors.password && <ErrorMessage text={errors.password.message} />}
        </div>
        <Button text="Submit" variant="secondary" isDisabled={isLoading} />
      </div>
    </Form>
  );
}
