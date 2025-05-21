// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          error.message = error.response.data.message || 'Bad Request';
          break;
        case 404:
          error.message = error.response.data.message || 'Resource Not Found';
          break;
        case 500:
          error.message = error.response.data.message || 'Server Error';
          break;
        default:
          error.message = 'An unexpected error occurred';
      }
    } else if (error.request) {
      error.message = 'No response received from server';
    } else {
      error.message = 'Network error or request setup issue';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;