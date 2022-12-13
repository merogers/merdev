import axios from 'axios';

const baseUrl = import.meta.env.VITE_SERVER_URL;

const API_URL = `${baseUrl}/api/projects`;

const createProject = async (projectData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  console.log('createproject', projectData);

  const response = await axios.post(API_URL, projectData, config);

  return response.data;
};

const getProjects = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const getLatestProjects = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const deleteProject = async (projectId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + projectId, config);
  return response.data;
};

const projectService = {
  createProject,
  getProjects,
  deleteProject,
  getLatestProjects,
};

export default projectService;
