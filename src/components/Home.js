import React from "react";
// import { Link } from "react-router-dom";
import BikeList from "./BikeList";
import RentalForm from "./RentalForm";
import DeliveryForm from "./DeliveryForm";
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
        {/* <nav className="home-navbar">
          <Link to="/home" className="home-nav-link">
            Home
          </Link>
          <Link to="/login" className="home-nav-link">
            Login
          </Link>
          <Link to="/register" className="home-nav-link">
            Register
          </Link>
          <Link to="/profile" className="home-nav-link">
            Profile
          </Link>
        </nav> */}
      </div>
      <div className="home-contentSection">
        <AboutSection />
        <ImageSection />
        <div className="home-fade-in-section">
          {/* <h1>Available Bikes</h1> */}
        </div>
        <BikeList />
        <RentalForm />
        <DeliveryForm />
      </div>
      <footer className="home-footer">
        <p>&copy; 2024 E-Bike Rentals. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
