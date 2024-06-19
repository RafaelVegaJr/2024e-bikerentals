import React, { useEffect, useState } from "react";
import axios from "../axiosConfig"; // Update this import

const BikeList = () => {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    axios
      .get("/api/bikes") // Update the URL to use relative path
      .then((response) => setBikes(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h2>Available Bikes</h2>
      <ul>
        {bikes.map((bike) => (
          <li key={bike.id}>
            <h3>{bike.name}</h3>
            <p>{bike.description}</p>
            <p>Price: ${bike.price}/day</p>
            <button>Rent Now</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BikeList;
