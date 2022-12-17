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

const updateProject = async (projectData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  console.log('updateproject', projectData);

  const response = await axios.put(
    API_URL + '/' + projectData._id,
    projectData,
    config
  );
  console.log(response.data);
  return response.data;
};

const getUserProjects = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const getLatestProjects = async () => {
  const response = await axios.get(API_URL + '/latest');
  console.log(response.data);
  return response.data;
};

const deleteProject = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + '/' + id, config);
  return response.data;
};

const projectService = {
  createProject,
  getUserProjects,
  deleteProject,
  getLatestProjects,
  updateProject,
};

export default projectService;
