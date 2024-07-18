import axios from 'axios';
import env from '../../env';

const api = axios.create({
  baseURL: env.VITE_BACKEND_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  },
);

export default api;
