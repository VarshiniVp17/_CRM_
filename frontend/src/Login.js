import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  
import logo from './images/logo1.png';
import './Login.css';
 
const Login = () => {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(''); 
  const navigate = useNavigate();
 
  const handleLogin = async (e) => {
    e.preventDefault();
 
    try {
      const response = await axios.post('http://172.16.3.154:3006/api/login', {
        username,
        password
      });
      if (response.data.success) {
        // Store user session data in localStorage (or sessionStorage)
        localStorage.setItem('user', JSON.stringify({ username }));
        localStorage.setItem("bu_unit",response.data.bu_unit);
        // const { email, bu_unit } = response.data;
        // localStorage.setItem('userEmail', email);
        // localStorage.setItem('buUnit', bu_unit);
 
 
        // Redirect to home
        navigate('/home');
      } else {
        setError(response.data.message); // Display error message
      }
    } catch (err) {
      console.error(err);
      setError('Invalid User. Please ensure you have access');
    }
  };
 
  return (
    <div className="login-page">
<div className="login-container">
        {/* <img src="src/assets/images/image1.png" alt="SRM Tech Logo" class="login-logo" ></img> */}
<img src={logo} alt="SRM Tech Logo" className="login-logo" />
<h2>Welcome!!</h2>
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
</div>
  );
};
 
export default Login;