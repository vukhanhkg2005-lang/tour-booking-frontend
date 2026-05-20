import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  // If using Vite proxy, leave this as '/api'. 
  // If directly connecting, use the backend URL like 'http://localhost:5000/api'
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach tokens if you have authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle 401 Unauthorized or other global errors here
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      // e.g., window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
