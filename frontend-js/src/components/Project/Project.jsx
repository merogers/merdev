import React from 'react';

import './Project.scss';

import { FaGithub, FaServer } from 'react-icons/fa';

const Project = ({ project }) => {
  const {
    title,
    description,
    screenshotUrl,
    codeUrl,
    demoUrl,
    tags,
    updatedAt,
  } = project;

  const formatDate = (date) => {
    let newDate = new Date(date).toLocaleDateString();
    return newDate;
  };

  return (
    <article className='project'>
      <div className='project__img-container'>
        <img className='project__img' src={screenshotUrl} />
      </div>

      <div className='project__content'>
        <div className='project__button-container'>
          <a
            href={demoUrl}
            rel='noreferrer'
            target='_blank'
            className='project__button-lg-primary'
          >
            <FaGithub className='project__button-icon' />
            View Demo
          </a>
          <a
            href={codeUrl}
            rel='noreferrer'
            target='_blank'
            className='project__button-lg-secondary'
          >
            <FaServer className='project__button-icon' />
            View Code
          </a>
        </div>
        <div className='project__text'>
          <h2 className='project__h2'>{title}</h2>

          <p className='project__p'>{description}</p>
          <p className='project__date'>Last Updated: {formatDate(updatedAt)}</p>
        </div>

        <ul className='project__tag-list'>
          {tags &&
            tags.length &&
            tags.map((tag) => {
              return (
                <li className='project__tag' key={tag}>
                  {tag.toUpperCase()}
                </li>
              );
            })}
        </ul>
      </div>
    </article>
  );
};

export default Project;
