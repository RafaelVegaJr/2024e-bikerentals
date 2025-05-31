import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>COMPANY</h2>
            <Link to="/sign-up">How it works</Link>
            <Link to="/">About us</Link>
            <Link to="/">Contact us</Link>
          </div>

          <div className="footer-link-items">
            <h2>E-BIKES</h2>
            <Link to="/bikes">Aventon Soltera 2.0</Link>
          </div>
        </div>

        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>COMMUNITY</h2>

            <Link to="/">E-Bike Safety</Link>

            <Link to="/">Videos</Link>
          </div>
        </div>
      </div>

      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link to="/" className="social-logo">
              EC <i className="fas fa-bicycle" />
            </Link>
          </div>
          <div className="website-rights">EC 2025</div>
          <div className="social-icons">
            <Link
              className="social-icon-link facebook"
              to="/"
              target="_blank"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f" />
            </Link>
            <Link
              className="social-icon-link instagram"
              to="/"
              target="_blank"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram" />
            </Link>
            <a
              className="social-icon-link twitter"
              href="https://twitter.com/@RAFAELV27531015"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter" />
            </a>
          </div>
        </div>
      </section>

      {/* ✅ This ensures consistent black footer bar */}
      <section className="footer-bottom-bar">
        <p className="footer-copy">
          © 2025 ElectrikCruise Rentals. All Rights Reserved.
        </p>
      </section>
    </div>
  );
}

export default Footer;
