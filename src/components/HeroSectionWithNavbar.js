import React, { useEffect } from "react";
import {
  MDBNavbar,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBContainer,
  MDBCollapse,
} from "mdb-react-ui-kit";
import videoSource from "../videos/video2.mp4"; // Correct import path for the video
import "./HeroSectionWithNavbar.css"; // Importing the CSS file
import { useLocation } from "react-router-dom";

export default function HeroSectionWithNavbar() {
  const [showNav, setShowNav] = React.useState(false);
  useEffect(() => {
    const video = document.querySelector(".bg-video");
    if (video) {
      video.addEventListener("ended", () => {
        video.currentTime = 0;
        video.play();
      });
    }
  }, []);
  const location = useLocation();

  const scrollToBottom = (e) => {
    // Only scroll if on homepage
    if (location.pathname === "/" || location.pathname === "/home") {
      e.preventDefault();
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
    // Otherwise, let the link navigate normally (like to /scheduling)
  };

  return (
    <header style={{ padding: 0, margin: 0, paddingLeft: 0 }}>
      <div className="bg-video-wrapper">
        <video
          className="bg-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <MDBNavbar
          expand="lg"
          light
          style={{
            backgroundColor: "transparent",
            padding: 0,
            margin: 0,
            position: "absolute",
            top: 0,
            zIndex: 10,
          }}
          className="navbar"
        >
          <MDBContainer fluid>
            <MDBNavbarToggler
              aria-controls="navbarExample01"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => setShowNav(!showNav)}
            >
              <MDBIcon fas icon="bars" />
            </MDBNavbarToggler>
            <MDBCollapse
              navbar
              show={showNav ? true : undefined}
              className={`navbar-collapse ${showNav ? "show" : ""}`}
            >
              <MDBNavbarNav className="mb-2 mb-lg-0 justify-content-end">
                <MDBNavbarItem active>
                  <a className="nav-link" href="/home">
                    Home
                  </a>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <a className="nav-link" href="/signup">
                    Sign-Up
                  </a>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <a
                    href="#bottom"
                    onClick={scrollToBottom}
                    className="nav-link"
                  >
                    Book Now
                  </a>
                </MDBNavbarItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>

        <div className="hero-mask">
          <div className="text-white text-center">
            <h1 className="mb-3">Explore the Great Outdoors</h1>
            <h4 className="mb-3">Join the Ride Today</h4>
            <a
              href="#bottom"
              onClick={scrollToBottom}
              className="btn btn-outline-light btn-lg"
            >
              Let's Ride
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
