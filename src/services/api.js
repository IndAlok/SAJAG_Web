import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const ENABLE_MOCK_DATA = import.meta.env.VITE_ENABLE_MOCK_DATA === 'true';

console.log('[API] Initializing with baseURL:', API_BASE_URL);
console.log('[API] Mock data enabled:', ENABLE_MOCK_DATA);

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
    console.log(`[API] REQUEST: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    console.log('[API] Request headers:', config.headers);
    if (config.data) {
      console.log('[API] Request body:', config.data);
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('[API] Auth token attached');
    } else {
      console.log('[API] No auth token');
    }
    return config;
  },
  (error) => {
    console.error('[API] Request interceptor error:', error.message);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`[API] RESPONSE: ${response.status} ${response.config.url}`);
    console.log('[API] Response data:', response.data);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    console.error(`[API] ERROR: ${error.message}`);
    console.error('[API] Error config:', error.config?.url);
    console.error('[API] Error response:', error.response?.status, error.response?.data);
    
    // Check for CORS error
    if (!error.response && error.message.includes('Network Error')) {
      console.error('[API] CORS ERROR or Network Error detected!');
      console.error('[API] This usually means the backend is not responding or CORS is misconfigured');
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.warn('[API] 401 Unauthorized - authentication required');
      return Promise.reject(error);
    }

    if (error.response?.status === 500) {
      console.error('[API] 500 Server error:', error.response.data);
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
