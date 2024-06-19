import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../axiosConfig";
import "./Register.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return re.test(String(password));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!firstName) formErrors.firstName = "First name is required";
    if (!lastName) formErrors.lastName = "Last name is required";
    if (!username) formErrors.username = "Username is required";
    if (!email || !validateEmail(email))
      formErrors.email = "Valid email is required";
    if (!phone) formErrors.phone = "Phone number is required";
    if (!password || !validatePassword(password))
      formErrors.password =
        "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post("/api/users/register", {
        firstName,
        lastName,
        username,
        email,
        phone,
        password,
      });
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="register-background">
      <nav className="register-navbar">
        <Link to="/home" className="register-nav-link">
          Home
        </Link>
      </nav>
      <div className="register-mainContainer">
        <div className="register-formContainer">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="inputContainer">
              <label htmlFor="firstName">First name</label>
              <input
                id="firstName"
                name="firstName"
                value={firstName}
                placeholder="First name"
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
                required
                className="inputBox"
              />
              {errors.firstName && (
                <label className="errorLabel">{errors.firstName}</label>
              )}
            </div>
            <div className="inputContainer">
              <label htmlFor="lastName">Last name</label>
              <input
                id="lastName"
                name="lastName"
                value={lastName}
                placeholder="Last name"
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
                required
                className="inputBox"
              />
              {errors.lastName && (
                <label className="errorLabel">{errors.lastName}</label>
              )}
            </div>
            <div className="inputContainer">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
                className="inputBox"
              />
              {errors.username && (
                <label className="errorLabel">{errors.username}</label>
              )}
            </div>
            <div className="inputContainer">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                value={email}
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="inputBox"
              />
              {errors.email && (
                <label className="errorLabel">{errors.email}</label>
              )}
            </div>
            <div className="inputContainer">
              <label htmlFor="phone">Phone number</label>
              <input
                id="phone"
                name="phone"
                value={phone}
                placeholder="Phone number"
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                required
                className="inputBox"
              />
              {errors.phone && (
                <label className="errorLabel">{errors.phone}</label>
              )}
            </div>
            <div className="inputContainer">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
                className="inputBox"
              />
              {errors.password && (
                <label className="errorLabel">{errors.password}</label>
              )}
            </div>
            <div className="inputContainer">
              <button type="submit" className="inputButton">
                Continue
              </button>
            </div>
          </form>
          <div className="inputContainer">
            <Link to="/login">Already have an account? Sign in</Link>
          </div>
        </div>
      </div>
      <footer className="register-footer">
        <p>&copy; 2024 E-Bike Rentals. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Register;
