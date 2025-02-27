import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ConfirmationPage.css";

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  console.log("Location state:", state); // Log the state to see what data is passed

  if (!state) {
    console.log("No state found, redirecting to home...");
    navigate("/home");
    return null;
  }

  const { data } = state;

  console.log("Data in confirmation page:", data);

  const bikePrice = data.rental.total_price || 0;
  const deliveryFee = data.delivery.deliveryFee || 0;
  const totalPrice = bikePrice + deliveryFee;
  const dropOffAddress = data.delivery.dropOffAddress || "N/A";

  return (
    <div className="confirmation-page">
      <h1>Booking Confirmed!</h1>
      <p>Thank you for booking with us. Here are your details:</p>
      <div>
        <p>Rental ID: {data.rental.id}</p>
        <p>Bike: {data.rental.bike_id}</p>
        <p>
          Start Date: {new Date(data.rental.rental_start_date).toLocaleString()}
        </p>
        <p>
          End Date: {new Date(data.rental.rental_end_date).toLocaleString()}
        </p>
        <p>
          Delivery Date:{" "}
          {new Date(data.delivery.deliveryDate).toLocaleDateString()}
        </p>
        <p>Delivery Time: {data.delivery.deliveryTime}</p>
        <p>Drop-off Address: {dropOffAddress}</p>
        <p>Bike Rental: ${bikePrice}</p>
        <p>Delivery Fee: ${deliveryFee}</p>
        <p>
          <strong>Total Price: ${totalPrice}</strong>
        </p>
      </div>

      {/* ✅ Home Button Added Here */}
      <button className="home-button" onClick={() => navigate("/home")}>
        Home
      </button>
    </div>
  );
};

export default ConfirmationPage;
