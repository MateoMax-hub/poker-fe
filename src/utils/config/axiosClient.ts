import axios from 'axios';

const baseURL = `${import.meta.env.VITE_API_URL}/api`;

const axiosClient = axios.create({
  baseURL,
});

axiosClient.interceptors.request.use(function (config) {
  const tokenString = localStorage.getItem('token');
  if (tokenString) {
    config.headers.Authorization = `${tokenString}`;
  }
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    switch (error.response?.status) {
      case 401:
        localStorage.removeItem('token');
        window.location.href = '/login';
        break;

      case 500:
        error.data = error.response.data ? error.response.data : null;
        delete error.response;
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
