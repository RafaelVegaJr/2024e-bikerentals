// src/App.js
import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import RentalAndDeliveryForm from "./components/RentalAndDeliveryForm";
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
            path="rent_and_delivery"
            element={<ProtectedRoute component={RentalAndDeliveryForm} />}
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
