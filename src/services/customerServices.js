import axios from 'axios';

const API_URL = 'https://localhost:7235/api/User';

// 🔐 Helper to get the token from localStorage (if used)
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// 📌 Fetch all users (Admin functionality)
export const GetAllUsers = () => {
  return axios.get(API_URL, { headers: getAuthHeaders() });
};

// 📌 Fetch a single user by ID
export const GetUser = (id) => {
  return axios.get(`${API_URL}/${id}`, { headers: getAuthHeaders() });
};

// 📌 Create a new user
export const CreateUser = (userData) => {
  return axios.post(API_URL, userData, { headers: getAuthHeaders() });
};

// 📌 Update a user
export const UpdateUser = (id, updatedData) => {
  return axios.put(`${API_URL}/${id}`, updatedData, { headers: getAuthHeaders() });
};

// 📌 Delete a user
export const DeleteUser = (id) => {
  return axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
};
