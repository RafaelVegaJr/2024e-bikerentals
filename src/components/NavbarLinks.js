import React from "react";
import { useLocation } from "react-router-dom";

const NavbarLinks = () => {
  const location = useLocation();

  const scrollToBikes = (e) => {
    if (location.pathname === "/" || location.pathname === "/home") {
      e.preventDefault();
      const bikes = document.getElementById("bike-list");
      if (bikes) {
        bikes.scrollIntoView({ behavior: "smooth" });
      }
    }
    // If not on Home, let the link do normal behavior (if it's a real page link)
  };

  return (
    <>
      <a className="nav-link" href="/home">
        Home
      </a>
      <a className="nav-link" href="/login">
        Login
      </a>
      <a className="nav-link" href="/register">
        Register
      </a>
      <a className="nav-link" href="#bike-list" onClick={scrollToBikes}>
        Book Now
      </a>
    </>
  );
};

export default NavbarLinks;
