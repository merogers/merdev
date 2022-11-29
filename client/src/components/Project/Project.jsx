import React from 'react';

import './Project.scss';

import '../Button/Button.scss';

const Project = ({ project }) => {
  const { title, description, imgSrc, demobutton, codebutton, tags } = project;

  return (
    <article className='project'>
      <div className='project__img-container'>
        <img className='project__img' src={imgSrc} />
      </div>

      <div className='project__content'>
        <div className='project__buttons'>
          <button to={demobutton} className='button button--primary button--margin'>
            View Demo
          </button>
          <button to={codebutton} className='button button--secondary'>
            View Code
          </button>
        </div>
        <div className='project__text'>
          <h2 className='project__h2'>{title}</h2>
          <p className='project__p'>{description}</p>
        </div>

        <ul className='project__tag-list'>
          {tags &&
            tags.map((tag) => {
              return (
                <li className='project__tag' key={tag}>
                  {tag}
                </li>
              );
            })}
        </ul>
      </div>
    </article>
  );
};

export default Project;
