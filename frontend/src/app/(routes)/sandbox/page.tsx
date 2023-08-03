'use client';

import Main from '../../../components/Main';
import Container from '../../../components/Container';
import P, { H1, H2, H3, H4, H5, H6, Subtitle, Tag } from '../../../components/Typography';
import Card from '../../../components/Card';
import Form, { Label, TextareaField, TextField, LabelField } from '../../../components/Form';
import Button from '@/components/Button';

export default function Projects() {
  return (
    <Main height="h-auto">
      <Container>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <H1>Header 1</H1>
            <H2>Header 2</H2>
            <H3>Header 3</H3>
            <H4>Header 4</H4>
            <H5>Header 5</H5>
            <H6>Header 6</H6>
            <P>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In blandit ultricies diam, in facilisis libero
              gravida nec. Suspendisse urna nulla, maximus eu lobortis sollicitudin, posuere ut lacus. Suspendisse
              fringilla luctus imperdiet. Maecenas fermentum odio vel blandit mollis. In quis hendrerit libero.
              Pellentesque cursus euismod odio ac convallis.
            </P>
            <P>
              Maecenas faucibus varius libero sed convallis. Phasellus ultrices metus at sollicitudin fermentum. Aenean
              sagittis tortor eget nibh interdum, nec semper enim euismod. Ut id purus odio. Duis tristique, elit at
              blandit mollis, elit nulla vehicula lacus, vitae bibendum arcu ex in magna. Nulla facilisi. Suspendisse
              tristique sem nibh. Etiam elit massa, gravida nec libero cursus, dapibus rutrum lectus.
            </P>
            <Subtitle>Subtitle</Subtitle>
            <div className="flex gap-1 mb-4">
              <Tag>Tag</Tag>
              <Tag>Tag</Tag>
            </div>
          </div>
          <div className="flex gap-2 flex-col">
            <Card>
              <div className="p-4">Derp</div>
            </Card>
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
        </div>
      </Container>
    </Main>
  );
}
