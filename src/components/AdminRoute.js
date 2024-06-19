// src/components/AdminRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  const decodedToken = jwtDecode(token);
  const { role } = decodedToken;

  return role === "admin" ? children : <Navigate to="/home" />;
};

export default AdminRoute;
