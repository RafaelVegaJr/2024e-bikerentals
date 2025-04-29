import React from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import HeroSectionWithNavbar from "./HeroSectionWithNavbar";
import "./Layout.css";
import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const Layout = () => {
  const location = useLocation();
  const authPages = ["/signup", "/login"]; // pages where you show Home button
  const showHomeButton = authPages.includes(location.pathname);

  const showHeroSection = location.pathname === "/home"; // ✅ only on homepage

  return (
    <div className="App" style={{ position: "relative", minHeight: "100vh" }}>
      {/* Home Button on auth pages */}
      {showHomeButton && (
        <div
          style={{
            position: "absolute",
            top: "1.5rem",

            left: "2rem", // stick it to the left
            zIndex: 1000, // stay on top
            transform: "none",
            // no centering needed
          }}
        >
          <Link to="/home" style={{ textDecoration: "none" }}>
            <Button
              variant="text"
              sx={{
                color: "#111827", // soft dark gray/black text
                fontWeight: 500,
                fontSize: "16px",
                textTransform: "none",
              }}
            >
              ← Back
            </Button>
          </Link>
        </div>
      )}

      {/* Hero Section ONLY on homepage */}
      {showHeroSection && <HeroSectionWithNavbar />}

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
