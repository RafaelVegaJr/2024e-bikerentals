// src/Router.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import BikeList from "./components/BikeList";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import RentalForm from "./components/RentalForm";
import DeliveryForm from "./components/DeliveryForm";

const AppRouter = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/" element={<ProtectedRoute component={BikeList} />} />
    <Route path="/rental" element={<ProtectedRoute component={RentalForm} />} />
    <Route
      path="/delivery"
      element={<ProtectedRoute component={DeliveryForm} />}
    />
  </Routes>
);

export default AppRouter;
