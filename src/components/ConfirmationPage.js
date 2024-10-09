import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ConfirmationPage.css";

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  console.log("Location state:", state); // Log the state to see what data is passed

  if (!state) {
    // If there's no state, redirect back to the home page or an error page
    console.log("No state found, redirecting to home...");
    navigate("/home");
    return null;
  }

  const { data } = state;

  console.log("Data in confirmation page:", data); // Log the data to ensure it's available

  // Extract rental cost, delivery fee, and total price
  const bikePrice = data.rental.total_price || 0; // Ensure the rental price is available
  const deliveryFee = data.delivery.deliveryFee || 0; // Adjust if deliveryFee is available
  const totalPrice = bikePrice + deliveryFee;

  // Update the path to correctly access the drop-off address
  const dropOffAddress = data.delivery.dropOffAddress || "N/A"; // Access drop-off address from data.delivery

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
        <p>Drop-off Address: {dropOffAddress}</p>{" "}
        {/* Correctly display the drop-off address */}
        <p>Bike Rental: ${bikePrice}</p>
        <p>Delivery Fee: ${deliveryFee}</p>
        <p>
          <strong>Total Price: ${totalPrice}</strong>
        </p>
      </div>
    </div>
  );
};

export default ConfirmationPage;
