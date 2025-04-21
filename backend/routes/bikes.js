// routes/bikes.js
const express = require("express");
const router = express.Router();
const Bike = require("../models/Bike");

// GET: Fetch all bikes
router.get("/", async (req, res) => {
  try {
    const bikes = await Bike.findAll({
      attributes: [
        "id",
        "name",
        "description",
        "price",
        "availability_status",
        "type",
      ],
    });
    res.json(bikes);
  } catch (error) {
    console.error("Error fetching bikes:", error);
    res.status(500).json({ error: "An error occurred while fetching bikes" });
  }
});

// ✅ POST: Add a bike manually (for testing or seeding)
router.post("/add", async (req, res) => {
  try {
    const bike = await Bike.create({
      name: "E-Bike",
      description: "Aventon e-bike perfect for city rides.",
      price: 25,
      availability_status: "available",
      type: "hybrid",
    });
    res.json(bike);
  } catch (error) {
    console.error("Error adding bike:", error);
    res.status(500).json({ error: "Failed to add bike" });
  }
});

module.exports = router;
