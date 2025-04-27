import React, { useEffect } from "react";
import "./AboutSection.css";

const AboutSection = () => {
  useEffect(() => {
    const handleScroll = () => {
      const aboutTitle = document.querySelector(".about-title");
      const aboutText = document.querySelector(".about-paragraphs");
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="about-section">
      <div className="about-section-content">
        <div className="about-text-container">
          <h1 className="about-title">
            <span>Discover</span>
            <span>Our</span>
            <span>E-Bike</span>
            <span>Rentals</span>
          </h1>
          <div className="about-paragraphs">
            <p>
              Looking for an adventure? We’re proud to offer the Aventon
              Soltera—a sleek, high-performance electric bike perfect for
              cruising city streets or enjoying a scenic ride.
            </p>
            <p>
              Whether you're commuting, exploring, or just out for some fresh
              air, our e-bike delivers the perfect mix of comfort, power, and
              style.
            </p>
            <p>
              We're all about providing an easy, enjoyable rental experience
              with a focus on quality, simplicity, and personalized service. Try
              it for yourself and feel the ride.
            </p>
          </div>
        </div>
        <div className="about-section-image"></div>
      </div>
    </div>
  );
};

export default AboutSection;
