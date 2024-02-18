import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { H2 } from './Typography';
import Form, { Input, Label, ErrorMessage } from './Form';
import Button from './Button';
import { useRegisterMutation } from '../redux/services/auth';
import { ErrorMsg } from '../types';

export default function RegisterForm() {
  // If things go on login, display error to user
  const [userMessage, setUserMessage] = useState('');

  const registerSchema = z
    .object({
      firstName: z.string().min(2).max(30),
      lastName: z.string().min(2).max(30),
      email: z.string().email(),
      password: z.string().min(5).max(20),
      confirmPassword: z.string().min(5).max(20),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });

  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  // Infer the type from already defined schema
  type RegisterSchemaType = z.infer<typeof registerSchema>;

  // Grab the stuff from useForm
  const {
    register: formRegister,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(registerSchema) });

  // Submit data with RTK Query, and bring user to dashboard
  async function submitData(data: RegisterSchemaType) {
    setUserMessage('');
    try {
      // Do register function
      const registerData = await register(data).unwrap();

      if (registerData) {
        // dispatch(setCredentials(loginData));
        // Move to dashboard
        navigate('/login');
      }
    } catch (error: unknown) {
      setUserMessage((error as ErrorMsg).data.message);
    }
  }

  // React Hook form - Set focus on first field
  useEffect(() => {
    setFocus('firstName');
  }, [setFocus]);

  return (
    <Form onSubmit={handleSubmit(submitData)}>
      <div className="w-4/5 mx-auto flex flex-col items-center my-8">
        <H2>Register</H2>

        <div className="w-full my-8">
          <Label name="firstName" title="First name" />
          <Input type="text" name="firstName" error={errors.firstName} register={formRegister} />
          {errors.firstName && <ErrorMessage text={errors.firstName.message} />}
        </div>
        <div className="w-full mb-8">
          <Label name="lastName" title="Last Name" />
          <Input type="text" name="lastName" error={errors.lastName} register={formRegister} />
          {errors.lastName && <ErrorMessage text={errors.lastName.message} />}
        </div>

        <div className="w-full mb-8">
          <Label name="email" title="Email" />
          <Input type="text" name="email" error={errors.password} register={formRegister} />
          {errors.email && <ErrorMessage text={errors.email.message} />}
        </div>

        <div className="w-full mb-8">
          <Label name="password" title="Password" />
          <Input type="password" name="password" error={errors.password} register={formRegister} />
          {errors.password && <ErrorMessage text={errors.password.message} />}
        </div>
        <div className="w-full mb-8">
          <Label name="confirmPassword" title="Confirm Password" />
          <Input type="password" name="confirmPassword" error={errors.confirmPassword} register={formRegister} />
          {errors.confirmPassword && <ErrorMessage text={errors.confirmPassword.message} />}
        </div>

        {userMessage && <div className="mb-8 text-red-500">{userMessage}</div>}
        <Button text="Submit" variant="secondary" isDisabled={isLoading} size="lg" />
      </div>
    </Form>
  );
}
