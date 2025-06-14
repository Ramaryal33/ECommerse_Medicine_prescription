import { jwtDecode } from 'jwt-decode';

const getEmailFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded?.email || null;
  } catch (err) {
    console.error('Invalid token:', err);
    return null;
  }
};

export default getEmailFromToken;
