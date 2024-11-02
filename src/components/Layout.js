// src/components/Layout.js
import React from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import HeroSectionWithNavbar from "./HeroSectionWithNavbar";
import "./Layout.css"; // Ensure you have CSS for the layout
import { Button } from "@mui/material";

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  return (
    <div className="App">
      {!isHomePage && ( // Show Home button on all pages except the homepage
        <header style={{ padding: "10px", backgroundColor: "#f1f1f1" }}>
          <Link to="/home">
            <Button variant="contained" color="primary">
              Home
            </Button>
          </Link>
        </header>
      )}
      {isHomePage && <HeroSectionWithNavbar />}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
