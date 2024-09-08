import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "../axiosConfig"; // Update this import
import "./BikeList.css"; // Importing the CSS for BikeList

// Importing images
import Image1 from "../images/Image14.jpg";
import Image2 from "../images/Image15.jpg";
import Image3 from "../images/Image16.jpg";

const BikeList = () => {
  const [bikes, setBikes] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    axios
      .get("/api/bikes") // Update the URL to use relative path
      .then((response) => setBikes(response.data))
      .catch((error) => console.log(error));
  }, []);

  // Handle the Book Now button click
  const handleBookNow = (bike) => {
    navigate(`/schedule/${bike.id}`, { state: { bike } });
  };

  return (
    <div className="bike-list">
      {bikes.map((bike, index) => (
        <div key={bike.id} className="bike-card">
          <img
            src={index === 0 ? Image1 : index === 1 ? Image2 : Image3}
            alt={bike.name}
            className="bike-image"
          />
          <h2>{bike.name}</h2>
          <p>{bike.description}</p>
          <p>Price: ${bike.price}/day</p>
          <button
            className="btn btn-primary"
            onClick={() => handleBookNow(bike)}
          >
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default BikeList;
