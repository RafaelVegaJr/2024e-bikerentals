// src/components/HeroSectionWithNavbar.js
import React from "react";
import { Link } from "react-router-dom";
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

export default function HeroSectionWithNavbar() {
  const [showNav, setShowNav] = React.useState(false);

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
                  <Link className="nav-link" to="/home">
                    Home
                  </Link>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </MDBNavbarItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>

        <div className="mask">
          <div className="text-white">
            <h1 className="mb-3">Explore the Great Outdoors</h1>
            <h4 className="mb-3">Join the Ride Today</h4>
            <Link
              className="btn btn-outline-light btn-lg"
              to="/home"
              role="button"
            >
              Lets Ride
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
