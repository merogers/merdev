'use client';

import { useGetProjectsQuery } from '@/lib/redux/services/api';

function Projects() {
  const { data, error, isLoading } = useGetProjectsQuery();

  if (error) return <h1>Error</h1>;
  if (isLoading) return <h1>Loading...</h1>;

  console.log(data);

  return (
    <main className="flex ">
      <h1>Derp</h1>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>yay</h3>
        </>
      ) : null}
    </main>
  );
}

export default Projects;
