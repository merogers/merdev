'use client';

import Main from '../../components/Main';
import Container from '../../components/Container';
import { H2 } from '../../components/Typography';
import Form, { LabelField } from '../../components/Form';
import { ButtonLink } from '../../components/Button';

export default function Login() {
  return (
    <Main height="min-h-min">
      <Container>
        <div className="flex gap-2 flex-col w-full my-0 md:my-8">
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
                <ButtonLink href="/projects" text="Login" />
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </Main>
  );
}
