import React from "react";
import { useLocation } from "react-router-dom";

const NavbarLinks = () => {
  const location = useLocation();

  const scrollToBikes = (e) => {
    console.log("🚲 scrollToBikes triggered");

    if (
      (location.pathname === "/" || location.pathname === "/home") &&
      e.target.closest(".scroll-to-bikes")
    ) {
      e.preventDefault();
      const bikes = document.getElementById("bike-list");
      if (bikes) {
        console.log("📍 Scrolling to #bike-list");
        bikes.scrollIntoView({ behavior: "smooth" });
      }
    }
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
      <a
        href="/home"
        className="nav-link scroll-to-bikes"
        onClick={scrollToBikes}
      >
        Book Now
      </a>
    </>
  );
};

export default NavbarLinks;
