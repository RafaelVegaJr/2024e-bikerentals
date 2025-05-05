import React, { useEffect } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import HeroSectionWithNavbar from "./HeroSectionWithNavbar";
import "./Layout.css";
import { Button } from "@mui/material";

const Layout = () => {
  const location = useLocation();
  const authPages = ["/signup", "/login"]; // pages where you show Home button
  const showHomeButton = authPages.includes(location.pathname);
  const showHeroSection = location.pathname === "/home"; // only on homepage

  // ✅ Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <div className="App" style={{ position: "relative", minHeight: "100vh" }}>
      {/* Home Button on auth pages */}
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

      {/* Hero Section ONLY on homepage */}
      {showHeroSection && <HeroSectionWithNavbar />}

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
