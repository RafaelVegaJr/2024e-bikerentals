import React from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import HeroSectionWithNavbar from "./HeroSectionWithNavbar";
import "./Layout.css"; // Ensure you have CSS for the layout
import { Button } from "@mui/material";

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  // Define routes where the Home button should appear
  const routesWithHomeButton = ["/signup", "/login"];
  const showHomeButton = routesWithHomeButton.includes(location.pathname);

  return (
    <div className="App">
      {/* Render Home button on specific routes */}
      {showHomeButton && (
        <Link to="/home">
          <Button variant="contained" color="primary">
            Home
          </Button>
        </Link>
      )}
      {/* Render HeroSectionWithNavbar only on the homepage */}
      {isHomePage && <HeroSectionWithNavbar />}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
