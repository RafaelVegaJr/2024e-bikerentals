// src/components/Login.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../axiosConfig";
import Cookies from "js-cookie";
import "./Login.css"; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const onButtonClick = async () => {
    try {
      const response = await axios.post("/api/users/login", {
        username: email,
        password,
      });
      Cookies.set("token", response.data.token, { expires: 1 }); // Set the token cookie with a 1-day expiry
      navigate("/profile"); // Redirect to profile page
    } catch (error) {
      console.error("Error logging in:", error);
      setEmailError("Invalid email or password");
      setPasswordError("Invalid email or password");
    }
  };

  return (
    <div className="login-background">
      <nav className="login-navbar">
        <Link to="/home" className="login-nav-link">
          Home
        </Link>
      </nav>
      <div className="login-mainContainer">
        <div className="login-titleContainer">
          <div>Login</div>
        </div>
        <br />
        <div className="login-inputContainer">
          <label htmlFor="email">Username</label>
          <input
            id="email"
            name="email"
            value={email}
            placeholder="Enter your username here"
            onChange={(ev) => setEmail(ev.target.value)}
            autoComplete="username"
            required
            className="login-inputBox"
          />
          <label className="login-errorLabel">{emailError}</label>
        </div>
        <br />
        <div className="login-inputContainer">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
            autoComplete="current-password"
            required
            className="login-inputBox"
          />
          <label className="login-errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className="login-inputContainer">
          <input
            className="inputButton"
            type="button"
            onClick={onButtonClick}
            value="Log in"
          />
        </div>
      </div>
      <footer className="login-footer">
        <p>&copy; 2024 E-Bike Rentals. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
