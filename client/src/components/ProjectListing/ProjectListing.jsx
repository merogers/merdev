import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FaPen, FaTrash } from 'react-icons/fa';

import './ProjectListing.scss';
import { toast } from 'react-toastify';

const ProjectListing = ({
  project,
  setFormData,
  setEditMode,
  deleteProject,
}) => {
  const { userProjects } = useSelector((state) => state.projects);

  const formatDate = (date) => {
    let newDate = new Date(date).toLocaleDateString();
    return newDate;
  };

  const dispatch = useDispatch();

  const handleEdit = () => {
    setEditMode(true);
    setFormData({
      title: project.title,
      description: project.description,
      demoUrl: project.demoUrl,
      codeUrl: project.codeUrl,
      tags: project.tags.join(' '),
      screenshot: project.screenshot,
    });
  };

  const handleDelete = () => {
    dispatch(deleteProject(project._id));
    toast.success('Project deleted successfully');
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
          onClick={handleDelete}
        >
          <FaTrash />
        </button>
      </div>
    </li>
  );
};

export default ProjectListing;
