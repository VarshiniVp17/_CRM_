import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(''); 
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3006/api/login', {
        username,
        password
      });

      if (response.data.success) {
        // Store user session data in localStorage (or sessionStorage)
        localStorage.setItem('user', JSON.stringify({ username }));

        // Redirect to home
        navigate('/home');
      } else {
        setError(response.data.message); // Display error message
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while trying to log in.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <div className="error">{error}</div>} {/* Display error if any */}
    </div>
  );
};

export default Login;
