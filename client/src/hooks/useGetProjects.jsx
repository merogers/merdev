import axios from 'axios';
import React, { useState, useEffect } from 'react';

const baseUrl = import.meta.env.VITE_SERVER_URL;
const API_URL = `${baseUrl}/api/projects`;

const useGetProjects = () => {
  const [projectData, setProjectData] = useState({
    projects: [],
    isError: false,
    isLoading: true,
    message: '',
  });

  const { projects, isSuccess, isError, isLoading, message } = projectData;

  const getProjects = async () => {
    setTimeout(async () => {
      const response = await axios.get(API_URL);

      if (response.status === 200) {
        setProjectData((prev) => ({
          ...prev,
          isLoading: false,
          projects: [...response.data],
        }));
      } else {
        setProjectData((prev) => ({
          ...prev,
          isError: true,
          isLoading: false,
          message: 'Could not retrieve projects',
        }));
      }
    }, 1500);
  };

  useEffect(() => {
    getProjects();
  }, []);

  return { projects, isSuccess, isError, isLoading, message };
};

export default useGetProjects;
