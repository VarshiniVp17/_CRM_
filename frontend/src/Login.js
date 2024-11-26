import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { baseUrl2 } from "./API";

// Path to your logo image in the public folder
const logoPath = process.env.PUBLIC_URL + "/image.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl2}/login`, {
        email,
        password,
      });
      setLoading(false);
      if (response.data.success) {
        navigate("/home");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setLoading(false);
      console.error(err); // Log the error for debugging
      setError("An error occurred during login");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src={logoPath} alt="Logo" className="logo" />
        <h1>
          <center>Enter your login credentials</center>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
