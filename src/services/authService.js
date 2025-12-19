import api, { setAuthToken, setStoredUser, clearAuthData, getStoredToken, getStoredUser } from './api';

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  const { token, ...userData } = response.data.data || response.data;
  
  if (token) {
    setAuthToken(token);
    setStoredUser(userData);
  }
  
  return { token, user: userData };
};

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  const { token, ...user } = response.data.data || response.data;
  
  if (token) {
    setAuthToken(token);
    setStoredUser(user);
  }
  
  return { token, user };
};

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data.data || response.data;
};

export const logout = () => {
  clearAuthData();
};

export const restoreSession = () => {
  const token = getStoredToken();
  const user = getStoredUser();
  
  if (token && user) {
    setAuthToken(token);
    return { token, user, isAuthenticated: true };
  }
  
  return { token: null, user: null, isAuthenticated: false };
};

export const isAuthenticated = () => {
  const token = getStoredToken();
  return !!token;
};
