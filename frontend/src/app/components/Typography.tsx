import { PropsWithChildren } from 'react';

export function H1({ children }: PropsWithChildren) {
  return <h1 className="text-5xl md:text-5xl text-secondary-500 font-bold mb-4">{children}</h1>;
}

export function H2({ children }: PropsWithChildren) {
  return <h2 className="text-3xl md:text-4xl text-secondary-500 font-semibold mb-2">{children}</h2>;
}

export function H3({ children }: PropsWithChildren) {
  return <h3 className="text-2xl md:text-3xl text-secondary-500 font-semibold mb-2">{children}</h3>;
}

export function H4({ children }: PropsWithChildren) {
  return <h4 className="text-xl md:text-2xl text-secondary-500 font-semibold mb-1">{children}</h4>;
}

export function H5({ children }: PropsWithChildren) {
  return <h5 className="text-lg md:text-xl text-secondary-500 font-medium mb-1">{children}</h5>;
}

export function H6({ children }: PropsWithChildren) {
  return <h6 className="text-base md:text-lg text-secondary-500 font-medium mb-1">{children}</h6>;
}

export function Subtitle({ children }: PropsWithChildren) {
  return (
    <small className="text-sm font-semibold uppercase pl-2 border-l-primary-300 border-l-4 mb-2 text-secondary-300 tracking-wide">
      {children}
    </small>
  );
}

export function P({ children }: PropsWithChildren) {
  return <p className="text-sm md:text-base leading-6 md:leading-7 mb-3 text-secondary-500">{children}</p>;
}

export function Tag({ children }: PropsWithChildren) {
  return (
    <div className="bg-secondary-400 text-secondary-50 md:py-0.5 py-py px-2 md:px-3 uppercase rounded-sm font-light text-sm md:text-base tracking-wide">
      {children}
    </div>
  );
}

export default function Typography() {
  return (
    <div className="flex flex-col">
      <H1>Header 1</H1>
      <H2>Header 2</H2>
      <H3>Header 3</H3>
      <H4>Header 4</H4>
      <H5>Header 5</H5>
      <H6>Header 6</H6>
      <P>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In blandit ultricies diam, in facilisis libero gravida
        nec. Suspendisse urna nulla, maximus eu lobortis sollicitudin, posuere ut lacus. Suspendisse fringilla luctus
        imperdiet. Maecenas fermentum odio vel blandit mollis. In quis hendrerit libero. Pellentesque cursus euismod
        odio ac convallis.
      </P>
      <P>
        Maecenas faucibus varius libero sed convallis. Phasellus ultrices metus at sollicitudin fermentum. Aenean
        sagittis tortor eget nibh interdum, nec semper enim euismod. Ut id purus odio. Duis tristique, elit at blandit
        mollis, elit nulla vehicula lacus, vitae bibendum arcu ex in magna. Nulla facilisi. Suspendisse tristique sem
        nibh. Etiam elit massa, gravida nec libero cursus, dapibus rutrum lectus.
      </P>
      <Subtitle>Subtitle</Subtitle>
      <div className="flex gap-1 mb-4">
        <Tag>Tag</Tag>
        <Tag>Tag</Tag>
      </div>
    </div>
  );
}
