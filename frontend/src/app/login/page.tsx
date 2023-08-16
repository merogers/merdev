'use client';

import Main from '../../components/Main';
import Container from '../../components/Container';
import P, { H1, H2, H3, H4, H5, H6, Subtitle, Tag } from '../../components/Typography';
import Card from '../../components/Card';
import Form, { LabelField } from '../../components/Form';
import Button from '../../components/Button';

export default function Login() {
  return (
    <Main height="min-h-[calc(100vh-5rem)]">
      <Container>
        <div className="flex gap-2 flex-col w-full mt-8">
          <div className="flex w-full max-w-xl mx-auto">
            <Form>
              <div className="flex mt-4 justify-center">
                <H2>Login</H2>
              </div>
              <div className="my-4">
                <LabelField name="name" title="Name" type="text" />
                <LabelField name="email" title="Email" type="text" />
                <LabelField name="password" title="Password" type="password" />
              </div>
              <div className="mt-8 flex justify-center">
                <Button href="/projects" background="bg-secondary-400" hover="bg-secondary-300" text="Login" />
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </Main>
  );
}
