// src/components/BikeList.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axiosConfig";
import "./BikeList.css";

const BikeList = () => {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    axios
      .get("/api/bikes")
      .then((response) => setBikes(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div id="bike-list" className="bike-list">
      {bikes.map((bike) => (
        <div key={bike.id} className="bike-card">
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
