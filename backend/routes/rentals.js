// routes/rentals.js
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { name, bike, rentalDays } = req.body;
  // Handle the rental submission logic here
  console.log("Rental submitted:", { name, bike, rentalDays });
  res.status(200).send("Rental submitted successfully");
});

module.exports = router;
