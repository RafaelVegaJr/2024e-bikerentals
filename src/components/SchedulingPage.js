import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDeliveryFee } from "../utils/deliveryUtils"; // Correct import statement
import "./SchedulingPage.css";

const SchedulingPage = () => {
  const { bikeId } = useParams();
  const numericBikeId = Number(bikeId);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [dropOffAddress, setDropOffAddress] = useState("");
  const [dropOffCity, setDropOffCity] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const deliveryFee = getDeliveryFee(dropOffCity);

    console.log({
      bike: numericBikeId,
      rentalDays: 1,
      deliveryDate: date,
      deliveryTime: time,
      name,
      address,
      dropOffAddress,
      dropOffCity,
      deliveryFee,
    });

    try {
      const response = await fetch(
        "http://localhost:5000/api/rentals_and_deliveries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bike: numericBikeId,
            rentalDays: 1,
            deliveryDate: date,
            deliveryTime: time,
            name,
            address,
            dropOffAddress,
            dropOffCity,
            deliveryFee,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Rental and delivery scheduled successfully:", data);

        navigate("/confirmation", {
          state: { data },
        });
      } else {
        console.error(
          "Failed to schedule rental and delivery:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Schedule Your E-Bike Rental</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            required
          />
        </label>
        <br />
        <label>
          Select a Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Select a Time:
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Drop-off City:
          <select
            value={dropOffCity}
            onChange={(e) => setDropOffCity(e.target.value)}
            required
          >
            <option value="">Select a city</option>
            <option value="Indio">Indio</option>
            <option value="Coachella">Coachella</option>
            <option value="Palm Desert">Palm Desert</option>
            <option value="Cathedral City">Cathedral City</option>
            <option value="Palm Springs">Palm Springs</option>
          </select>
        </label>
        <br />
        <label>
          Drop-off Address:
          <input
            type="text"
            value={dropOffAddress}
            onChange={(e) => setDropOffAddress(e.target.value)}
            placeholder="Enter drop-off address"
            required
          />
        </label>
        <button type="submit">Schedule Rental</button>
      </form>
    </div>
  );
};

export default SchedulingPage;
