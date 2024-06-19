const express = require("express");
const router = express.Router();
const Bike = require("../models/Bike"); // Ensure the correct path to Bike.js

// Get all bikes
router.get("/", async (req, res) => {
  try {
    const bikes = await Bike.findAll();
    res.json(bikes);
  } catch (error) {
    console.error("Error fetching bikes:", error);
    res.status(500).json({ error: "An error occurred while fetching bikes" });
  }
});

module.exports = router;
