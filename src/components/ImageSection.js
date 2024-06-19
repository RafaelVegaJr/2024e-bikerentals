// src/components/ImageSection.js
import React from "react";
import "./ImageSection.css"; // Import the CSS for this component
import Image2 from "../images/Image13.jpg";
import Image3 from "../images/Image3.jpg";

const ImageSection = () => {
  return (
    <div className="image-section">
      <div className="image-container image-container-left">
        <img src={Image2} alt="Description 1" />
      </div>
      <div className="image-container image-container-right">
        <img src={Image3} alt="Description 2" />
      </div>
    </div>
  );
};

export default ImageSection;
