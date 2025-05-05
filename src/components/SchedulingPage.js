import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDeliveryFee } from "../utils/deliveryUtils";
import axiosInstance from "../axiosConfig";
import "./SchedulingPage.css";
import Image1 from "../images/Image17.png";

const SchedulingPage = () => {
  useEffect(() => {
    const scrollToTop = () =>
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    scrollToTop();
    setTimeout(scrollToTop, 200);
    setTimeout(scrollToTop, 500);
    setTimeout(scrollToTop, 800);
  }, []);

  const { bikeId } = useParams();
  const numericBikeId = Number(bikeId);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [dropOffAddress, setDropOffAddress] = useState("");
  const [dropOffCity, setDropOffCity] = useState("");
  const [rentalDuration, setRentalDuration] = useState(""); // start empty
  const [showSpecs, setShowSpecs] = useState(false);
  const [dateType, setDateType] = useState("text");
  const [timeType, setTimeType] = useState("text");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const deliveryFee = getDeliveryFee(dropOffCity);
    const bikeRentalCostPerHour = 10;
    const rentalCost = bikeRentalCostPerHour * rentalDuration;
    const totalPrice = rentalCost + deliveryFee;

    try {
      const response = await axiosInstance.post("/api/rentals_and_deliveries", {
        username: "rafaelvega",
        name,
        bike: numericBikeId,
        rentalHours: rentalDuration,
        address,
        phone,
        deliveryDate: date,
        deliveryTime: time,
        dropOffAddress,
        dropOffCity,
        deliveryFee,
      });

      const data = response.data;

      const paymentIntentResponse = await axiosInstance.post(
        "/api/rentals_and_deliveries/create-payment-intent",
        {
          amount: totalPrice * 100,
        }
      );

      const paymentIntentData = paymentIntentResponse.data;

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
    } catch (error) {
      console.error(
        "Error during rental or payment intent:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="scheduling-wrapper">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* Left Side */}
      <div className="scheduling-left">
        <div
          style={{
            width: "100%",
            maxWidth: "320px",
            height: "auto",
            marginTop: "10px",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={Image1}
            alt="Aventon Soltera"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "200px",
              objectFit: "contain",
            }}
          />
        </div>

        <button className="spec-btn" onClick={() => setShowSpecs(!showSpecs)}>
          {showSpecs ? "Hide Specs" : "View Specs"}
        </button>

        {showSpecs && (
          <div className="spec-modal">
            <h3>Bike Specs</h3>
            <ul>
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
        )}
      </div>

      {/* Right Side Form */}
      <div className="scheduling-right">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            required
          />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Your Address"
            required
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Your Phone Number"
            required
          />

          {/* Custom date/time fields */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Select a date"
            required
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Select a time"
            required
          />

          <input
            type="number"
            min="1"
            value={rentalDuration}
            onChange={(e) => setRentalDuration(e.target.value)}
            placeholder="Rental Duration (hours)"
            required
          />
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
          <input
            type="text"
            value={dropOffAddress}
            onChange={(e) => setDropOffAddress(e.target.value)}
            placeholder="Drop-off Address"
            required
          />
          <div className="button-container">
            <button type="submit">Schedule Rental</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SchedulingPage;
