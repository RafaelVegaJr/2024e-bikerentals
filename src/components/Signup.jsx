// src/components/SignupForm.jsx
import React, { useState } from "react";
import "./SignUp.css";
import axiosInstance from "../axiosConfig";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        full_name: formData.fullName,
      };
      delete payload.fullName;

      const response = await axiosInstance.post("/api/users/signup", payload);
      console.log("User created:", response.data);

      setSuccessMessage(
        "Account successfully created! Redirecting to login..."
      );
      setTimeout(() => navigate("/login"), 2000); // redirect after 2 seconds
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Signup failed");
    }
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="signup-wrapper">
      <div className="signup-left">
        <h2>New here?</h2>
        <p>Sign up and start exploring our service today.</p>
        <button className="outline-btn" onClick={() => setShowModal(true)}>
          Learn More
        </button>
      </div>

      <div className="signup-right">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-inner">
            <div className="input-group">
              <input
                type="text"
                name="fullName"
                placeholder="Your Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="text"
                name="username"
                placeholder="Your Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Your Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="primary-signup-btn">
              Sign Up
            </button>
            {successMessage && (
              <p style={{ color: "#28a745", marginTop: "1rem" }}>
                {successMessage}
              </p>
            )}
          </div>
        </form>
      </div>

      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>How Our Service Works</h2>
            <p>
              Rent or schedule an e-bike delivery in seconds. Our rides are
              eco-friendly, fast, and easy to access. Just sign up, choose your
              ride plan, and start moving!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupForm;
