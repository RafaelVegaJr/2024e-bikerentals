import React, { useState } from "react";
import "./Form.css"; // Import the CSS file

const RentalForm = () => {
  const [name, setName] = useState("");
  const [bike, setBike] = useState("Mountain Bike");
  const [rentalDays, setRentalDays] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submit logic here
    console.log({ name, bike, rentalDays });
  };

  return (
    <div className="section">
      <h2>Rent a Bike</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="bike">Bike:</label>
          <select
            id="bike"
            value={bike}
            onChange={(e) => setBike(e.target.value)}
            autoComplete="bike"
          >
            <option value="Mountain Bike">Mountain Bike</option>
            <option value="Road Bike">Road Bike</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="rentalDays">Rental Days:</label>
          <input
            type="number"
            id="rentalDays"
            value={rentalDays}
            onChange={(e) => setRentalDays(e.target.value)}
            autoComplete="rental-days"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RentalForm;
