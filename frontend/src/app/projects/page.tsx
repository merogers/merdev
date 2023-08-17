import Main from '../../components/Shared/Main';
import Container from '../../components/Shared/Container';
import Card from '../../components/Shared/Card';

export default function ProjectsPage() {
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
