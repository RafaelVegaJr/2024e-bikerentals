// src/axiosConfig.js
import axios from "axios";
import Cookies from "js-cookie";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://two024e-bikerentals.onrender.com" // your deployed backend
    : "http://localhost:5000"; // local dev backend

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
