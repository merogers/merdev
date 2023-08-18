'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { H2 } from '../Shared/Typography';
import Form, { LabelField } from './Form';
import Button from '../Shared/Button';
import { useLoginMutation } from '../../redux/features/auth/authApiSlice';
import { useAppSelector } from '../../redux/store';
import { logIn } from '../../redux/features/auth/authSlice';

export default function Login() {
  const [error, setError] = useState('');

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5).max(20),
  });

  const { user } = useAppSelector(state => state.auth);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  console.log(user);

  // Infer the type from already defined schema
  type loginSchemaType = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchemaType>({ resolver: zodResolver(loginSchema) });

  async function submitData(data: loginSchemaType) {
    setError('');
    const loginData = await login(data).unwrap();
    dispatch(logIn(loginData));
    router.push('/dashboard');
    if (loginData?.error?.status === 404) {
      setError('User not found');
    } else if (loginData?.error?.status === 401) {
      setError('Invalid Credentials');
    }
  }

  return (
    <Form onSubmit={handleSubmit(submitData)}>
      <div className="flex mt-4 justify-center">
        <H2>Login</H2>
      </div>
      <div className="my-4">
        <LabelField name="email" title="Email" type="text" register={register} error={errors.email} />
        <LabelField name="password" title="Password" type="password" register={register} error={errors.password} />
      </div>
      {error && <div className="text-red-500 text-sm mx-auto">{error}</div>}
      <div className="mt-8 flex justify-center">
        <Button text={`${isLoading ? 'Loading' : 'Login'}`} isDisabled={isLoading} />
      </div>
    </Form>
  );
}
