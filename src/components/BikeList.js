import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axiosConfig"; // Update this import
import "./BikeList.css"; // Importing the CSS for BikeList

// Importing images
import Image1 from "../images/Image14.jpg";
import Image2 from "../images/Image15.jpg";
import Image3 from "../images/Image16.jpg";
// Import more images as needed...

const BikeList = () => {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    axios
      .get("/api/bikes") // Update the URL to use relative path
      .then((response) => setBikes(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="bike-list">
      {bikes.map((bike, index) => (
        <div key={bike.id} className="bike-card">
          {/* Add the image based on the bike or index */}
          <img
            src={index === 0 ? Image1 : index === 1 ? Image2 : Image3}
            alt={bike.name}
            className="bike-image"
          />
          <h2>{bike.name}</h2>
          <p>{bike.description}</p>
          <p>Price: ${bike.price}/day</p>
          <Link to={`/schedule/${bike.id}`} className="btn btn-primary">
            Book Now
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BikeList;
