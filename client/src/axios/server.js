import axios from 'axios';

const server = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    Accept: 'application/json',
  },
});

export default server;
