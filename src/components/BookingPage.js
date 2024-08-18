// src/components/BookingPage.js
import React from "react";
import BikeList from "./BikeList";
import "./BookingPage.css"; // Importing the CSS for BookingPage

const BookingPage = () => {
  return (
    <div className="booking-page">
      <h1>Book Your E-Bike</h1>
      <BikeList />
    </div>
  );
};

export default BookingPage;
