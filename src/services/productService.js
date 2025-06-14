import api from './axiosConfig';

export const getAllProducts = () => {
  return api.get('/product');
};
