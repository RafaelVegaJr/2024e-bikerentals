// src/App.js
import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import RentalForm from "./components/RentalForm";
import DeliveryForm from "./components/DeliveryForm";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" />} />{" "}
          {/* Redirect root to /home */}
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="rental"
            element={<ProtectedRoute component={RentalForm} />}
          />
          <Route
            path="delivery"
            element={<ProtectedRoute component={DeliveryForm} />}
          />
          <Route
            path="profile"
            element={<ProtectedRoute component={Profile} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
