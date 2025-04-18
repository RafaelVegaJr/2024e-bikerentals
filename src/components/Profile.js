import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { Link } from "react-router-dom";
import "./Profile.css";
import profileImage from "../images/Image20.jpg";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/users/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-mainContainer">
      {/* Navigation Bar */}
      <nav className="profile-navbar">
        <Link to="/home" className="profile-nav-link">
          Home
        </Link>
        <Link to="/login" className="profile-nav-link">
          Login
        </Link>
        <Link to="/profile" className="profile-nav-link">
          Profile
        </Link>
      </nav>

      {/* Profile Content */}
      <div className="profile-contentContainer">
        {/* Profile Picture - Replace Placeholder with Actual Image */}
        <img src={profileImage} alt="Profile" className="profile-image" />

        <h1>Profile</h1>
        <p>
          <strong>Full Name:</strong> {profile.full_name}
        </p>
        <p>
          <strong>Username:</strong> {profile.username}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        <p>
          <strong>Role:</strong> {profile.role}
        </p>
      </div>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 E-Bike Rentals. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Profile;
