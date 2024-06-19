import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // Ensure this is correct
});

export default instance;
