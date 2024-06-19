import React, { useEffect } from "react";
import "./AboutSection.css"; // Import the CSS for this component

const AboutSection = () => {
  useEffect(() => {
    const handleScroll = () => {
      const aboutTitle = document.querySelector(".about-title");
      const aboutText = document.querySelector(".about-section pre");
      const scrollPosition = window.scrollY;

      if (scrollPosition > 50) {
        aboutTitle.classList.add("scrolled");
        aboutText.classList.add("scrolled");
      } else {
        aboutTitle.classList.remove("scrolled");
        aboutText.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="about-section">
      <div className="about-text-container">
        <h1 className="about-title">
          <span>Discover</span>
          <br />
          <span>Our</span>
          <br />
          <span>E-Bike</span>
          <br />
          <span>Rentals</span>
          <br />
        </h1>
        <pre>
          {`
      At E-Bike Rentals,
      we offer a wide range of electric bikes
      for all your outdoor adventures.
      Whether you're exploring trails, commuting to work,
      or enjoying a leisurely ride,
      our e-bikes provide the perfect
      combination of power and comfort.

      Our mission is to provide high-quality
      e-bikes and excellent customer service to ensure
      you have an unforgettable experience. Join us and
      discover the joy of riding an e-bike today!
          `}
        </pre>
      </div>
    </div>
  );
};

export default AboutSection;
