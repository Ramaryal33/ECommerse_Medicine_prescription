import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');

      // Send login request to backend API
      const response = await axios.post('https://localhost:7235/api/Auth/login', {
        email,
        password
      });

      if (response.status === 200) {
        // Store JWT token in localStorage
        const token = response.data.token;
        localStorage.setItem('token', token);

        // Decode JWT to extract the role (Base64 decoding)
        const decodedToken = JSON.parse(atob(token.split('.')[1]));  // Decode the payload of the token
        const role = decodedToken.role || decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        // Redirect based on role
        if (role.toLowerCase() === 'admin') {
        navigate('/admin/dashboard');  // Redirect to Admin Dashboard
       } else {
       navigate('/user/dashboard');   
        }
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Invalid credentials');
      } else {
        setError('Network error. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2>Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control custom-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control custom-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-success login-btn"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="signup-link mt-3">
          Don't have an account?{' '}
          <span className="link-text" onClick={() => navigate('/signup')}>
            Sign up
          </span>
        </p>
        <div className="back-button-container mt-3">
          <button className="btn" onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
