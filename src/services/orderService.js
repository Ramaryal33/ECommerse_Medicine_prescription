import axios from 'axios';

const BASE_URL = 'https://localhost:7235/api/Order';

export const GetAll = () => {
  return axios.get(BASE_URL);
};

export const GetById = (id) => {
  return axios.get(`${BASE_URL}/${id}`);
};

export const GetByUserId = (userId) => {
  return axios.get(`${BASE_URL}/user/${userId}`);
};

export const CreateOrder = (order) => {
  return axios.post(BASE_URL, order);
};

export const UpdateOrder = (id, order) => {
  return axios.put(`${BASE_URL}/${id}`, order);
};

export const DeleteOrder = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};
