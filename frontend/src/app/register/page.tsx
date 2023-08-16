'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Main from '../../components/Main';
import Container from '../../components/Container';
import { H2 } from '../../components/Typography';
import Form, { LabelField } from '../../components/Form';
import Button from '../../components/Button';

export default function Register() {
  const loginSchema = z
    .object({
      name: z.string().min(2).max(30),
      email: z.string().email(),
      password: z.string().min(5).max(20),
      confirmPassword: z.string().min(5).max(20),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });

  type loginSchemaType = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchemaType>({ resolver: zodResolver(loginSchema) });

  function submitData(data: loginSchemaType) {
    console.log(data);
  }

  return (
    <Main height="min-h-min">
      <Container>
        <div className="flex gap-2 flex-col w-full my-0 md:my-8">
          <div className="flex w-full max-w-xl mx-auto">
            <Form onSubmit={handleSubmit(submitData)}>
              <div className="flex mt-4 justify-center">
                <H2>Register</H2>
              </div>
              <div className="my-4">
                <LabelField name="name" title="Name" type="text" register={register} error={errors.name} />
                <LabelField name="email" title="Email" type="text" register={register} error={errors.email} />
                <LabelField
                  name="password"
                  title="Password"
                  type="password"
                  register={register}
                  error={errors.password}
                />
                <LabelField
                  name="confirmPassword"
                  title="Confirm Password"
                  type="password"
                  register={register}
                  error={errors.confirmPassword}
                />
              </div>
              <div className="mt-8 flex justify-center">
                <Button text="Register" />
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </Main>
  );
}
