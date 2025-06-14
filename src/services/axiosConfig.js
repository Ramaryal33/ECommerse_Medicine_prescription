import axios from 'axios';

// Create the axios instance
const api = axios.create({
  baseURL: 'https://localhost:7235/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Global error handler (can redirect to login if 401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized! Redirecting to login...');
      // e.g. window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
