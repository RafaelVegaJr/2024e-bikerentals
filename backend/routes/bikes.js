// routes/bikes.js
const express = require("express");
const router = express.Router();
const Bike = require("../models/Bike");

// Get all bikes
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

module.exports = router;
