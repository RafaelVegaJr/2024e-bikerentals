// src/components/Layout.js
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import HeroSectionWithNavbar from "./HeroSectionWithNavbar";
import "./Layout.css"; // Ensure you have CSS for the layout

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  return (
    <div className="App">
      {isHomePage && <HeroSectionWithNavbar />}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
