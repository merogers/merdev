import React from 'react';
import Card from '@/components/Shared/Card';
import P, { H3, Tag, Subtitle } from '@/components/Shared/Typography';
import Button, { ExternalLink } from '@/components/Shared/Button';
import Link from 'next/link';
import { ProjectModel } from '@/models/Project';

type ProjectProps = {
  project: ProjectModel;
};

export default function Project({ project }: ProjectProps) {
  const { title, description, createdAt, updatedAt } = project;
  return (
    <Card>
      <div className="flex flex-col w-full">
        <div className="flex flex-col w-full pt-4 pb-4 px-4">
          <div className="flex flex-col md:flex-row justify-between border-b-2 border-b-gray-100 pb-2">
            <H3>{title}</H3>

            <Subtitle>
              <div className="flex flex-row justify-between ">
                <span className="mr-4">Created:</span>
                <span>{createdAt.toLocaleDateString()}</span>
              </div>
              <div className="flex flex-row justify-between ">
                <span className="mr-4">Last Updated:</span>
                <span>{updatedAt.toLocaleDateString()}</span>
              </div>
            </Subtitle>
          </div>
          <div className="pt-4">
            <P>{description.slice(0, 150)}...</P>
          </div>
          <div className="flex flex-row gap-2 items-center justify-between">
            <Button text="Edit" size="sm" />
            <Link className="text-red-700 text-semibold mx-1 hover:text-red-400 transition-colors" href="/">
              Delete
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
