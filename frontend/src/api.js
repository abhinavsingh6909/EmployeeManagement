import axios from 'axios';

const PRIMARY_URL = 'http://localhost:5000';
const FALLBACK_URL = 'http://localhost:5001';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || PRIMARY_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      originalRequest &&
      !originalRequest._retry &&
      (error.code === 'ERR_NETWORK' || !error.response || error.response?.status === 403) &&
      originalRequest.baseURL === PRIMARY_URL &&
      !import.meta.env.VITE_API_URL
    ) {
      originalRequest._retry = true;
      originalRequest.baseURL = FALLBACK_URL;
      api.defaults.baseURL = FALLBACK_URL;
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const getEmployees = () => {
  return api.get('/employees');
};

export const addEmployee = (employeeData) => {
  return api.post('/employees', employeeData);
};

export const updateEmployee = (id, employeeData) => {
  return api.put(`/employees/${id}`, employeeData);
};

export const deleteEmployee = (id) => {
  return api.delete(`/employees/${id}`);
};

export default api;
