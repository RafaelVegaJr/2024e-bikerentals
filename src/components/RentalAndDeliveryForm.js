import React, { useState } from "react";
import "./Form.css"; // Import the CSS for the form

const RentalAndDeliveryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    bike: "",
    rentalDays: "",
    address: "",
    deliveryDate: "",
    deliveryTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Data to be submitted:", formData);
      const response = await fetch(
        "http://localhost:5000/api/rentals_and_deliveries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Rental and delivery scheduled successfully:", data);
      } else {
        console.error(
          "Error scheduling rental and delivery:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error scheduling rental and delivery:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Rent a Bike and Schedule Delivery</h2>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          autoComplete="name"
          required
        />
      </label>
      <label>
        Bike:
        <select
          name="bike"
          value={formData.bike}
          onChange={handleChange}
          required
        >
          <option value="">Select a bike</option>
          <option value="Mountain Bike">Mountain Bike</option>
          <option value="Road Bike">Road Bike</option>
        </select>
      </label>
      <label>
        Rental Days:
        <input
          type="number"
          name="rentalDays"
          value={formData.rentalDays}
          onChange={handleChange}
          autoComplete="rental-days"
          required
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          autoComplete="address"
          required
        />
      </label>
      <label>
        Delivery Date:
        <input
          type="date"
          name="deliveryDate"
          value={formData.deliveryDate}
          onChange={handleChange}
          autoComplete="delivery-date"
          required
        />
      </label>
      <label>
        Delivery Time:
        <input
          type="time"
          name="deliveryTime"
          value={formData.deliveryTime}
          onChange={handleChange}
          autoComplete="delivery-time"
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RentalAndDeliveryForm;
