// src/components/NavbarLinks.js
import React from "react";
import { Link } from "react-router-dom";

const NavbarLinks = () => {
  return (
    <>
      <Link className="nav-link" to="/home">
        Home
      </Link>
      <Link className="nav-link" to="/login">
        Login
      </Link>
      <Link className="nav-link" to="/register">
        Register
      </Link>
    </>
  );
};

export default NavbarLinks;
