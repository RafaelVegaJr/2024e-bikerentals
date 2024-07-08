// src/components/Home.js
import React from "react";
import BikeList from "./BikeList";
import RentalAndDeliveryForm from "./RentalAndDeliveryForm";
import ImageSection from "./ImageSection";
import AboutSection from "./AboutSection";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-mainContainer">
      <div className="home-bg-video-wrapper">
        <video className="home-bg-video" autoPlay loop muted>
          <source src="path-to-your-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="home-contentSection">
        <AboutSection />
        <ImageSection />
        <div className="home-fade-in-section"></div>
        <BikeList />
        <RentalAndDeliveryForm />
      </div>
      <footer className="home-footer">
        <p>&copy; 2024 E-Bike Rentals. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
