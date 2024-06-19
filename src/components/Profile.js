import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { Link } from "react-router-dom";
import "./Profile.css";

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
      <nav className="profile-navbar">
        <Link to="/home" className="profile-nav-link">
          Home
        </Link>
        <Link to="/login" className="profile-nav-link">
          Login
        </Link>
        <Link to="/register" className="profile-nav-link">
          Register
        </Link>
        <Link to="/profile" className="profile-nav-link">
          Profile
        </Link>
      </nav>
      <div className="profile-contentContainer">
        <h1>Profile</h1>
        <p>Username: {profile.username}</p>
        <p>Email: {profile.email}</p>
        <p>Phone: {profile.phone}</p>
        <p>Address: {profile.address}</p>
        <p>Role: {profile.role}</p>
      </div>
      <footer>
        <p>&copy; 2024 E-Bike Rentals. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Profile;
