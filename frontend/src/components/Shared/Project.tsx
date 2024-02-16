import { ProjectModel } from '@/models/Project';
import Image from 'next/image';
import Card from './Card';
import P, { H3, Tag, Subtitle } from './Typography';
import { ExternalLink } from './Button';

type ProjectProps = {
  project: ProjectModel;
};

export default function Project({ project }: ProjectProps) {
  const { screenshotUrl, title, description, demoUrl, codeUrl, tags, createdAt, updatedAt } = project;
  return (
    <Card>
      <div className="flex flex-col w-full">
        <div className="flex w-full h-64 overflow-hidden relative group">
          <Image
            src={screenshotUrl}
            fill
            alt={title}
            className="transition-opacity group-hover:opacity-75 object-cover object-top"
          />
        </div>
        <div className="flex flex-row gap-4 p-4">
          <ExternalLink href={demoUrl} text="View Demo" size="stretch" variant="primary" />
          <ExternalLink href={codeUrl} text="View Code" size="stretch" />
        </div>
        <div className="flex flex-col w-full pt-4 pb-4 px-4 relative  border-t-2 border-t-gray-100">
          <H3>{title}</H3>
          <div className="flex mt-4">
            <Subtitle>
              <div className="flex flex-row justify-between">
                <span className="mr-4">Created:</span>
                <span>{createdAt.toLocaleDateString()}</span>
              </div>
              <div className="flex flex-row justify-between">
                <span className="mr-4">Last Updated:</span>
                <span>{updatedAt.toLocaleDateString()}</span>
              </div>
            </Subtitle>
          </div>
          <div className="py-4">
            <P>{description}</P>
          </div>
          <div className="flex gap-2 flex-wrap">
            {tags.map(tag => (
              <Tag>{tag}</Tag>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
