import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const ENABLE_MOCK_DATA = import.meta.env.VITE_ENABLE_MOCK_DATA === 'true';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('sajag_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('sajag_token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('sajag_token');
    delete api.defaults.headers.common['Authorization'];
  }
};

export const getStoredToken = () => localStorage.getItem('sajag_token');

export const getStoredUser = () => {
  const user = localStorage.getItem('sajag_user');
  return user ? JSON.parse(user) : null;
};

export const setStoredUser = (user) => {
  if (user) {
    localStorage.setItem('sajag_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('sajag_user');
  }
};

export const clearAuthData = () => {
  localStorage.removeItem('sajag_token');
  localStorage.removeItem('sajag_user');
  delete api.defaults.headers.common['Authorization'];
};

export const isUsingMockData = () => ENABLE_MOCK_DATA;

export default api;
