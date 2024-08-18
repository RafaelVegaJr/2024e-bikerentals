import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SchedulingPage.css";

const SchedulingPage = () => {
  const { bikeId } = useParams(); // Get bikeId from the URL params
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Date:", date);
    console.log("Time:", time);
    console.log("Bike ID:", bikeId); // Log bikeId to ensure it's being used

    try {
      const response = await fetch(
        "http://localhost:5000/api/rentals_and_deliveries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bike: bikeId, // Use the bikeId instead of the bike name
            rentalDays: 1, // Assuming a default value of 1 day for now
            deliveryDate: date,
            deliveryTime: time,
            name: "John Doe", // Replace with the actual user's name from your state or context
            address: "123 Main St", // Replace with the actual user's address from your state or context
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Rental and delivery scheduled successfully:", data);

        // Pass the rental and delivery data to the confirmation page
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
        <button type="submit">Schedule Rental</button>
      </form>
    </div>
  );
};

export default SchedulingPage;
