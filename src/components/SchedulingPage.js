import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDeliveryFee } from "../utils/deliveryUtils";
import "./SchedulingPage.css";
import Image1 from "../images/Image17.jpg";

const SchedulingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { bikeId } = useParams();
  const numericBikeId = Number(bikeId);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [dropOffAddress, setDropOffAddress] = useState("");
  const [dropOffCity, setDropOffCity] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [rentalDuration, setRentalDuration] = useState(1);
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const deliveryFee = getDeliveryFee(dropOffCity);
    const bikeRentalCostPerHour = 10;
    const rentalCost = bikeRentalCostPerHour * rentalDuration;
    const totalPrice = rentalCost + deliveryFee;

    try {
      const response = await fetch(
        "https://two024e-bikerentals.onrender.com/api/rentals_and_deliveries",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bike: numericBikeId,
            rentalHours: rentalDuration,
            deliveryDate: date,
            deliveryTime: time,
            name,
            address,
            phone,
            dropOffAddress,
            dropOffCity,
            deliveryFee,
            rentalCost,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        const paymentIntentResponse = await fetch(
          "https://two024e-bikerentals.onrender.com/api/rentals_and_deliveries/create-payment-intent",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: totalPrice * 100 }),
          }
        );

        const paymentIntentData = await paymentIntentResponse.json();

        if (paymentIntentResponse.ok) {
          navigate("/payment", {
            state: {
              data: {
                clientSecret: paymentIntentData.clientSecret,
                rental: data.rental,
                delivery: {
                  ...data.delivery,
                  deliveryFee,
                },
                dropOffAddress,
                rentalCost,
                rentalDuration,
                totalPrice,
              },
            },
          });
        } else {
          console.error(
            "Failed to create payment intent:",
            paymentIntentData.error
          );
        }
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
    <div className="scheduling-container">
      {/* New grouped section for image, name and specs */}
      <div className="scheduling-info">
        <h2 className="bike-name">Aventon Soltera</h2>
        <div className="scheduling-image">
          <img src={Image1} alt="E-Bike" />
          <div className="bike-specs-container">
            <h3>
              <strong>Bike Specs</strong>
            </h3>

            <ul className="bike-specs">
              <li>
                <strong>Motor:</strong> 500W rear hub (35 Nm torque)
              </li>
              <li>
                <strong>Top Speed:</strong> 20 mph (pedal assist & throttle)
              </li>
              <li>
                <strong>Battery:</strong> 345Wh, removable (UL certified)
              </li>
              <li>
                <strong>Shifting:</strong> 7-speed Shimano Tourney
              </li>
              <li>
                <strong>Brakes:</strong> Mechanical disc brakes
              </li>
              <li>
                <strong>Wheels:</strong> 28" Kenda Kwest tires (40-622)
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="scheduling-page">
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
            Phone Number:
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
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
            Rental Duration (in hours):
            <input
              type="number"
              min="1"
              value={rentalDuration}
              onChange={(e) => setRentalDuration(e.target.value)}
              placeholder="Enter rental duration in hours"
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
          <br />
          <button type="submit">Schedule Rental</button>
        </form>
      </div>
    </div>
  );
};

export default SchedulingPage;
