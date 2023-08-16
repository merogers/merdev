'use client';

import Main from '../../components/Main';
import Container from '../../components/Container';
import Card from '../../components/Card';

export default function Projects() {
  return (
    <Main height="h-auto">
      <Container>
        <div className="flex flex-col">
          <div className="flex gap-2 flex-col">
            <Card>
              <div className="p-4">Derp</div>
            </Card>
          </div>
        </div>
      </Container>
    </Main>
  );
}
