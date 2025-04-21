import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
import axiosInstance from "../axiosConfig"; // make sure this is at the top

const SignUp = () => {
  const [formData, setFormData] = useState({
    full_name: "", // Fix: Rename to match backend
    username: "", // Fix: Add username field
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");

    if (
      !formData.full_name ||
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      setErrors("All fields are required.");
      return;
    }

    try {
      const response = await axiosInstance.post("/api/users/signup", formData);

      console.log("Server Response:", response.data);
      alert(
        `🎉 Welcome, ${formData.full_name}! Your account has been successfully created. Redirecting to login...`
      );

      window.location.href = "/login";
    } catch (error) {
      console.error("Signup Error:", error);
      setErrors(
        error.response?.data?.error || "Failed to connect to the server."
      );
    }
  };

  return (
    <div className="signup-container">
      <header className="signup-navbar">
        <nav>
          <Link to="/home" className="signup-nav-link">
            HOME
          </Link>
        </nav>
      </header>
      <main className="signup-mainContainer">
        <div className="signup-formContainer">
          <h2>Sign Up</h2>
          {errors && <p className="error-message">{errors}</p>}
          <form onSubmit={handleSubmit}>
            <div className="inputContainer">
              <label htmlFor="full_name">Full Name</label>
              <input
                type="text"
                id="full_name"
                placeholder="Your Full Name"
                value={formData.full_name}
                onChange={handleChange}
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Your Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Your Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
