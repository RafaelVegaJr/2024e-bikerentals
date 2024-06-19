import React, { useState } from "react";
import axios from "axios";
import "./Form.css";

const DeliveryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    deliveryDate: "",
    deliveryTime: "",
    rentalDuration: "",
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
      const response = await axios.post(
        "http://localhost:5000/api/deliveries",
        formData
      );
      console.log("Form data submitted:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Delivery Service</h2>
      <label>
        Name:
        <input
          type="text"
          name="name"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          name="address"
          autoComplete="street-address"
          value={formData.address}
          onChange={handleChange}
        />
      </label>
      <label>
        Delivery Date:
        <input
          type="date"
          name="deliveryDate"
          autoComplete="delivery-date"
          value={formData.deliveryDate}
          onChange={handleChange}
        />
      </label>
      <label>
        Delivery Time:
        <input
          type="time"
          name="deliveryTime"
          autoComplete="delivery-time"
          value={formData.deliveryTime}
          onChange={handleChange}
        />
      </label>
      <label>
        Rental Duration (hours):
        <input
          type="number"
          name="rentalDuration"
          autoComplete="rental-duration"
          min="1"
          max="24"
          value={formData.rentalDuration}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default DeliveryForm;
