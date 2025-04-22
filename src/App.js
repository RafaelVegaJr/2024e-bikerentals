import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import RentalAndDeliveryForm from "./components/RentalAndDeliveryForm";
import Profile from "./components/Profile";
import SchedulingPage from "./components/SchedulingPage";
import ConfirmationPage from "./components/ConfirmationPage";
import PaymentPage from "./components/PaymentPage";
import SignUp from "./components/SignUp";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(
  "pk_live_51PpcpTI24ZLxTROyGUafGdbtnQ0XCoQtpwuSDBq2N12FMViZQzJ7XQoqIc16360Bc54Nip3WTWcj0lSBqFhx2LDY007yF04Enn"
);

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Redirect root to /home */}
          <Route index element={<Navigate to="/home" />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route
            path="rent_and_delivery"
            element={<ProtectedRoute component={RentalAndDeliveryForm} />}
          />
          <Route
            path="profile"
            element={<ProtectedRoute component={Profile} />}
          />
          <Route path="book" element={<Navigate to="/home#bike-list" />} />
          <Route path="schedule/:bikeId" element={<SchedulingPage />} />
          <Route
            path="payment"
            element={
              <Elements stripe={stripePromise}>
                <PaymentPage />
              </Elements>
            }
          />
          <Route
            path="confirmation"
            element={
              <Elements stripe={stripePromise}>
                <ConfirmationPage />
              </Elements>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
