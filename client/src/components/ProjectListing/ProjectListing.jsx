import React from 'react';
import { useDispatch } from 'react-redux';

import { FaPen, FaTrash } from 'react-icons/fa';

import './ProjectListing.scss';

import { deleteUserProject } from '../../features/project/userProjectSlice';

const ProjectListing = ({ project, setFormData }) => {
  const formatDate = (date) => {
    let newDate = new Date(date).toLocaleDateString();
    return newDate;
  };

  const dispatch = useDispatch();

  const handleEdit = () => {
    setFormData({
      _id: project._id,
      title: project.title,
      description: project.description,
      demoUrl: project.demoUrl,
      codeUrl: project.codeUrl,
      tags: project.tags.join(','),
      screenshot: project.screenshot,
      screenshotUrl: project.screenshotUrl,
      replaceScreenshot: false,
    });
  };

  return (
    <li className='project-listing__item' key={project._id}>
      <div>
        <div className='project-listing__title'>{project.title}</div>
        <div className='project-listing__timestamp'>
          Last Updated: {formatDate(project.updatedAt)}
        </div>
      </div>

      <div className='project-listing__button-container'>
        <button
          className='project-listing__button-sm-primary project-listing__button-sm-primary--mr'
          onClick={handleEdit}
        >
          <FaPen />
        </button>
        <button
          className='project-listing__button-sm-secondary'
          onClick={() => dispatch(deleteUserProject(project._id))}
        >
          <FaTrash />
        </button>
      </div>
    </li>
  );
};

export default ProjectListing;
