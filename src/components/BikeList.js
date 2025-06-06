import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import "./BikeList.css";
import Image1 from "../images/Image17.png"; // Single image for E-Bike

const BikeList = () => {
  const [bike, setBike] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://two024e-bikerentals.onrender.com/api/bikes")
      .then((response) => {
        const hybrid = response.data.find((b) => b.name === "E-Bike");
        setBike(hybrid);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleBookNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("🛴 Rent Me clicked — navigating to schedule");

    if (bike) {
      navigate(`/schedule/${bike.id}`, { state: { bike } });
    }
  };

  return (
    <div id="bike-list" className="bike-list">
      {bike && (
        <div className="bike-card">
          <img src={Image1} alt={bike.name} className="bike-image" />
          <h2>{bike.name}</h2>
          <p>{bike.description}</p>
          <p>Price: ${bike.price}/hour</p>
          <button className="btn btn-dark" onClick={handleBookNow}>
            Rent Me
          </button>
        </div>
      )}
    </div>
  );
};

export default BikeList;
