// backend/routes/bike.js
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

// POST: Add a new bike
router.post("/add", async (req, res) => {
  try {
    const { name, description, price, availability_status, type } = req.body;
    const bike = await Bike.create({
      name,
      description,
      price,
      availability_status,
      type,
    });
    res.json(bike);
  } catch (error) {
    console.error("Error adding bike:", error);
    res.status(500).json({ error: "Failed to add bike" });
  }
});

module.exports = router;
