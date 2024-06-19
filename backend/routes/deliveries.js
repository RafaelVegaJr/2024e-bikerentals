// routes/deliveries.js
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { name, address, deliveryDate } = req.body;
  // Handle the delivery submission logic here
  console.log("Delivery submitted:", { name, address, deliveryDate });
  res.status(200).send("Delivery submitted successfully");
});

module.exports = router;
