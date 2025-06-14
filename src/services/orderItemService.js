import axios from 'axios';

export const Create = async (payload) => {
  const res = await axios.post('/api/OrderItem', payload);
  return res.data;
};

export const GetAll = async () => {
  const res = await axios.get('/api/OrderItem');
  return res.data;
};
