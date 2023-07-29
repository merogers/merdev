'use client';

import Main from '../components/Main';
import Container from '../components/Container';
import Typography from '../components/Typography';
import Card from '../components/Card';
import Form, { Label, TextareaField, TextField } from '../components/Form';

export default function Projects() {
  return (
    <Main height="h-auto">
      <Container>
        <div className="flex flex-col">
          <Typography />
          <div className="flex gap-2 flex-col">
            <Card>
              <div className="p-4">Derp</div>
            </Card>

            <Form>
              <Label>
                <TextField placeholder="test" name="test" />
              </Label>
              <Label>
                <TextareaField placeholder="test" name="test"></TextareaField>
              </Label>
            </Form>
          </div>
        </div>
      </Container>
    </Main>
  );
}
