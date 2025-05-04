import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import Cookies from "js-cookie";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("/api/users/login", {
        email,
        password,
      });
      Cookies.set("token", response.data.token, { expires: 1 });
      navigate("/profile");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-wrapper">
      {/* ✅ Only one back button here */}

      <div className="login-left">
        <h2>Welcome Back</h2>
        <p>Log in and hit the road with our e-bikes today.</p>
      </div>

      <div className="login-right">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>
        <p>
          Don’t have an account?{" "}
          <Link to="/register" className="login-nav-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
