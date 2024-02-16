import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { H2 } from './Typography';
import Form, { Input, Label, ErrorMessage } from './Form';
import Button from './Button';
import { useLoginMutation } from '../redux/api/apiSlice';
import { setCredentials } from '../redux/features/auth/authSlice';
import { ErrorMsg } from '../types';

export default function LoginForm() {
  // If things go on login, display error to user
  const [userMessage, setUserMessage] = useState('');

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5).max(20),
  });

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Infer the type from already defined schema
  type LoginSchemaType = z.infer<typeof loginSchema>;

  // Grab the stuff from useForm
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
    // TODO: Remove default values for Production
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'scotty@gmail.com', password: '123456' },
  });

  // Submit data with RTK Query, and bring user to dashboard
  async function submitData(data: LoginSchemaType) {
    setUserMessage('');
    try {
      // Do login function
      const loginData = await login(data).unwrap();

      if (loginData) {
        dispatch(setCredentials(loginData));
        // Move to dashboard
        navigate('/dashboard');
      }
    } catch (error: unknown) {
      setUserMessage((error as ErrorMsg).data.message);
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
        <div className="w-full mb-8">
          <Label name="password" title="Password" />
          <Input type="password" name="password" error={errors.password} register={register} />
          {errors.password && <ErrorMessage text={errors.password.message} />}
        </div>
        {userMessage && <div className="mb-8 text-red-500">{userMessage}</div>}
        <Button text="Submit" variant="secondary" isDisabled={isLoading} size="lg" />
      </div>
    </Form>
  );
}
