import React from "react";

const NavbarLinks = () => {
  const scrollToBikes = () => {
    document.getElementById("bike-list").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <a className="nav-link" href="#home">
        Home
      </a>
      <a className="nav-link" href="#login">
        Login
      </a>
      <a className="nav-link" href="#register">
        Register
      </a>
      <a className="nav-link" href="#bike-list" onClick={scrollToBikes}>
        Book Now
      </a>
    </>
  );
};

export default NavbarLinks;
