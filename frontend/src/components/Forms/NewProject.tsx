import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { H2 } from '../Typography';
import Form, { Input, Label, ErrorMessage } from '../Form';
import Button, { ButtonLink } from '../Button';
import { useLoginMutation } from '../../redux/services/auth';
import { setCredentials } from '../../redux/features/authSlice';
import { ErrorMsg } from '../../types';

export default function NewProject() {
  const [userMessage, setUserMessage] = useState('');

  const projectSchema = z.object({
    title: z.string().min(1).max(150),
    description: z.string().min(1).max(500),
    screenshot: z.string().min(1),
    tags: z.string().array(),
  });
  type ProjectSchemaType = z.infer<typeof projectSchema>;

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<ProjectSchemaType>({
    resolver: zodResolver(projectSchema),
  });

  async function submitData(data: ProjectSchemaType) {
    setUserMessage('');
    try {
      const projectData = await login(data).unwrap();
      if (projectData) {
        dispatch(setCredentials(projectData));
        navigate('/dashboard');
      }
    } catch (error: unknown) {
      setUserMessage((error as ErrorMsg).data.message);
    }
  }

  useEffect(() => {
    setFocus('title');
  }, [setFocus]);

  return (
    <Form onSubmit={handleSubmit(submitData)}>
      <div className="w-4/5 mx-auto flex flex-col items-center my-8">
        <H2>New Project</H2>
        <div className="w-full my-8">
          <Label name="title" title="Title" />
          <Input type="text" name="title" error={errors.title} register={register} />
          {errors.title && <ErrorMessage text={errors.title.message} />}
        </div>
        <div className="w-full my-8">
          <Label name="description" title="Description" />
          <Input type="text" name="description" error={errors.description} register={register} />
          {errors.description && <ErrorMessage text={errors.description.message} />}
        </div>
        <div className="w-full my-8">
          <Label name="screenshot" title="Screenshot" />
          <Input type="text" name="screenshotl" error={errors.screenshot} register={register} />
          {errors.screenshot && <ErrorMessage text={errors.screenshot.message} />}
        </div>
        <div className="w-full my-8">
          <Label name="tags" title="Tags" />
          <Input type="text" name="tags" error={errors.tags} register={register} />
          {errors.title && <ErrorMessage text={errors.tags.message} />}
        </div>

        {userMessage && <div className="mb-8 text-red-500">{userMessage}</div>}
        <div className="flex gap-4">
          <Button text="Create Project" variant="primary" isDisabled={isLoading} size="lg" />
          <ButtonLink variant="secondary" href="/dashboard" text="Cancel" size="lg" />
        </div>
      </div>
    </Form>
  );
}
