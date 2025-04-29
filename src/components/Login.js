import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axiosConfig"; // Import Axios
import Cookies from "js-cookie";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Redirect after login

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    console.log("🔹 Login button clicked");

    try {
      console.log("🔹 Sending request to /api/users/login...");
      const response = await axios.post("/api/users/login", {
        email,
        password,
      });

      console.log("🔹 Response received:", response);

      // Store token & redirect
      Cookies.set("token", response.data.token, { expires: 1 });
      console.log("✅ Login successful! Redirecting...");
      navigate("/profile");
    } catch (err) {
      console.error("❌ Login failed:", err.response?.data || err.message);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-wrapper">
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
          Don't have an account?{" "}
          <Link to="/register" className="login-nav-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
