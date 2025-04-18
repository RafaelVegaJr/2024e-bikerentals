import React from "react";
import "./ImageSection.css";
import Image2 from "../images/Image22.png"; // moon image for desktop
import Image3 from "../images/Image24.png"; // mountain image (left)

const ImageSection = () => {
  return (
    <div className="image-section">
      {/* 🖥️ Desktop-only left image (mountains) */}
      <div className="image-container image-container-left desktop-only">
        <img src={Image3} alt="Mountains" />
      </div>

      {/* 🖥️ Desktop-only right image (moon) */}
      <div className="image-container image-container-right desktop-only">
        <img src={Image2} alt="Night bike" />
      </div>

      {/* 📱 Mobile-only image (sun) */}
      <div className="image-container image-container-right mobile-only">
        <img src={Image2} alt="Day bike" />
      </div>
    </div>
  );
};

export default ImageSection;
