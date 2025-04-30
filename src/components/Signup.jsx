// src/components/SignupForm.jsx
import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/signup", formData); // <-- Adjust if your route is different
      console.log("User created:", response.data);
      // Optionally redirect or clear form here
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
          {showModal && (
            <div className="modal" onClick={() => setShowModal(false)}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="close" onClick={() => setShowModal(false)}>
                  &times;
                </span>
                <h2>How Our Service Works</h2>
                <p>
                  Rent or schedule an e-bike delivery in seconds. Our rides are
                  eco-friendly, fast, and easy to access. Just sign up, choose
                  your ride plan, and start moving!
                </p>
              </div>
            </div>
          )}

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

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
