import axios from 'axios';

const API_URL = 'https://localhost:7235/api/Cart';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

// GET: Get current user's cart
export const GetCart = async () => {
  const response = await axios.get(`${API_URL}/GetCart`, getAuthHeaders());
  return response.data;
};

// POST: Add to cart
export const CreateCart = async (cartItem) => {
  const response = await axios.post(`${API_URL}/CreateCart`, cartItem, getAuthHeaders());
  return response.data;
};

// DELETE: Remove from cart by cart item ID
export const DeleteCart = async (cartItemId) => {
  const response = await axios.delete(`${API_URL}/DeleteCart/${cartItemId}`, getAuthHeaders());
  return response.data;
};

// GET: Admin only - fetch all carts (optional)
export const GetAllCarts = async () => {
  const response = await axios.get(`${API_URL}/GetAllCarts`, getAuthHeaders());
  return response.data;
};
