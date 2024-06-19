import React, { useState } from "react";
import "./Form.css"; // Import the CSS file

const DeliveryForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submit logic here
    console.log({ name, address, deliveryDate });
  };

  return (
    <div className="section">
      <h2>Delivery Service</h2>
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
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            autoComplete="street-address"
          />
        </div>
        <div className="form-group">
          <label htmlFor="deliveryDate">Delivery Date:</label>
          <input
            type="date"
            id="deliveryDate"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            autoComplete="delivery-date"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DeliveryForm;
