import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mern-blog-backend.herokuapp.com',
});

instance.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem('token');
  return config;
});

export default instance;
