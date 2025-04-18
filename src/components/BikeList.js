import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import "./BikeList.css";

// Importing the single image for Hybrid Bike
import Image1 from "../images/Image17.jpg";

const BikeList = () => {
  const [bike, setBike] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/bikes")
      .then((response) => {
        const hybrid = response.data.find((b) => b.name === "E-Bike");
        setBike(hybrid);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleBookNow = () => {
    if (bike) {
      navigate(`/schedule/${bike.id}`, { state: { bike } });
    }
  };

  return (
    <div id="bottom" className="bike-list">
      {bike && (
        <div className="bike-card">
          <img src={Image1} alt={bike.name} className="bike-image" />
          <h2>{bike.name}</h2>
          <p>{bike.description}</p>
          <p>Price: ${bike.price}/hour</p>
          <button className="btn btn-primary" onClick={handleBookNow}>
            Book Now
          </button>
        </div>
      )}
    </div>
  );
};

export default BikeList;
