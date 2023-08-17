import Main from '../../components/Shared/Main';
import Container from '../../components/Shared/Container';
import P, { H1, H2, H3, H4, H5, H6, Subtitle, Tag } from '../../components/Shared/Typography';
import Card from '../../components/Shared/Card';
import Button, { ButtonLink } from '../../components/Shared/Button';

export const metadata = {
  title: 'Sandbox',
  description: 'This is just a development page. Please delete.',
};

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
            <div className="flex w-full max-w-xl mx-auto gap-2">
              <Button variant="primary" text="Primary" />
              <Button variant="secondary" text="Secondary" />
              <ButtonLink text="Button Link" href="/" />
            </div>
          </div>
        </div>
      </Container>
    </Main>
  );
}
