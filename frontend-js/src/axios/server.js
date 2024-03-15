import axios from 'axios';

const server = axios.create({
  baseURL: '/',
  headers: {
    Accept: 'application/json',
  },
});

export default server;
