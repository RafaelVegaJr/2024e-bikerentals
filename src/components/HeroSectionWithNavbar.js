import React from "react";
import {
  MDBNavbar,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBContainer,
  MDBCollapse,
} from "mdb-react-ui-kit";
import videoSource from "../videos/video1.mp4"; // Correct import path for the video
import "./HeroSectionWithNavbar.css"; // Importing the CSS file

export default function HeroSectionWithNavbar() {
  const [showNav, setShowNav] = React.useState(false);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <header style={{ paddingLeft: 0 }}>
      <div className="bg-video-wrapper">
        <video className="bg-video" autoPlay loop muted>
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <MDBNavbar expand="lg" light bgColor="transparent" className="navbar">
          <MDBContainer fluid>
            <MDBNavbarToggler
              aria-controls="navbarExample01"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => setShowNav(!showNav)}
            >
              <MDBIcon fas icon="bars" />
            </MDBNavbarToggler>
            <MDBCollapse navbar show={showNav ? true : undefined}>
              <MDBNavbarNav right className="mb-2 mb-lg-0 d-flex flex-row">
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
                  <a className="nav-link" href="/register">
                    Register
                  </a>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <a
                    href="#bottom" // Adding a valid href attribute
                    onClick={scrollToBottom}
                    style={{
                      cursor: "pointer",
                      textDecoration: "none",
                      color: "inherit",
                      display: "inline-block",
                      lineHeight: "inherit",
                      verticalAlign: "middle",
                    }}
                    className="nav-link"
                  >
                    Book Now
                  </a>
                </MDBNavbarItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>

        <div className="mask">
          <div className="text-white text-center">
            <h1 className="mb-3">Explore the Great Outdoors</h1>
            <h4 className="mb-3">Join the Ride Today</h4>
            <a
              className="btn btn-outline-light btn-lg"
              href="/home"
              role="button"
            >
              Let's Ride
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
