import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/Login";
// import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import RentalAndDeliveryForm from "./components/RentalAndDeliveryForm";
import Profile from "./components/Profile";
import SchedulingPage from "./components/SchedulingPage";
import ConfirmationPage from "./components/ConfirmationPage";
import PaymentPage from "./components/PaymentPage"; // Import PaymentPage
import SignUp from "./sign-up/SignUp"; // Adjust the path based on where you've placed the component
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(
  "pk_test_51PpcpTI24ZLxTROyx5lutFdXOGte2ltdgSDTyuu3mC85yM66ssnMSBdlTIAEwJTU21fyt0BTD3hQnGeBgUZGghoB00VPt9ZatB"
);

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" />} />{" "}
          {/* Redirect root to /home */}
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<SignUp />} />
          <Route
            path="rent_and_delivery"
            element={<ProtectedRoute component={RentalAndDeliveryForm} />}
          />
          <Route
            path="profile"
            element={<ProtectedRoute component={Profile} />}
          />
          <Route path="book" element={<Navigate to="/home#bike-list" />} />
          <Route path="schedule/:bikeId" element={<SchedulingPage />} />{" "}
          {/* SchedulingPage with bikeId */}
          {/* PaymentPage Route */}
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
