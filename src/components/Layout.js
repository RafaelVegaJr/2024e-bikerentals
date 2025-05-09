import React from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import HeroSectionWithNavbar from "./HeroSectionWithNavbar";
import "./Layout.css";
import { Button } from "@mui/material";
import ScrollToTop from "./ScrollToTop";

const Layout = () => {
  const location = useLocation();
  const authPages = ["/signup", "/login"];
  const showHomeButton = authPages.includes(location.pathname);
  const showHeroSection = location.pathname === "/home";

  return (
    <div className="App" style={{ position: "relative", minHeight: "100vh" }}>
      {/* ✅ ScrollToTop runs here after layout and content have mounted */}
      <ScrollToTop />

      {showHomeButton && (
        <div
          style={{
            position: "absolute",
            top: "1.5rem",
            left: "2rem",
            zIndex: 1000,
          }}
        >
          <Link to="/home" style={{ textDecoration: "none" }}>
            <Button
              variant="text"
              sx={{
                color: "#111827",
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

      {showHeroSection && <HeroSectionWithNavbar />}

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
