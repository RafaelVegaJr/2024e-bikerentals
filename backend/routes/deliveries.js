const express = require("express");
const router = express.Router();
const Delivery = require("../models/Delivery");

router.post("/", async (req, res) => {
  try {
    const { name, address, deliveryDate, deliveryTime, rentalDuration } =
      req.body;
    const newDelivery = await Delivery.create({
      name,
      address,
      deliveryDate,
      deliveryTime,
      rentalDuration,
    });
    res.status(201).json(newDelivery);
  } catch (error) {
    console.error("Error creating delivery:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the delivery" });
  }
});

module.exports = router;
