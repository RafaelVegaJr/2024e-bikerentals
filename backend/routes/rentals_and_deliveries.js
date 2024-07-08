const express = require("express");
const router = express.Router();
const { Sequelize } = require("sequelize");
const Rental = require("../models/Rental");
const Delivery = require("../models/Delivery");
const User = require("../models/User");
const Bike = require("../models/Bike");

console.log("Rentals and Deliveries Router Loaded");

router.post("/", async (req, res) => {
  const { name, bike, rentalDays, address, deliveryDate, deliveryTime } =
    req.body;

  console.log("Received data:", req.body);

  try {
    const user = await User.findOne({ where: { username: "newuser" } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const selectedBike = await Bike.findOne({ where: { name: bike } });
    if (!selectedBike) {
      return res.status(404).json({ error: "Bike not found" });
    }

    const userId = user.id;
    const bikeId = selectedBike.id;

    console.log("User ID:", userId);
    console.log("Bike ID:", bikeId);

    const rentalStartDate = new Date();
    const rentalEndDate = new Date(rentalStartDate);
    rentalEndDate.setDate(rentalStartDate.getDate() + parseInt(rentalDays));

    const combinedDeliveryDateTime = new Date(
      `${deliveryDate}T${deliveryTime}:00`
    );
    if (isNaN(combinedDeliveryDateTime.getTime())) {
      throw new Error("Invalid date or time format");
    }

    console.log("Rental Start Date:", rentalStartDate.toISOString());
    console.log("Rental End Date:", rentalEndDate.toISOString());
    console.log(
      "Combined Delivery DateTime:",
      combinedDeliveryDateTime.toISOString()
    );

    const rental = await Rental.create({
      user_id: userId,
      bike_id: bikeId,
      rental_start_date: rentalStartDate,
      rental_end_date: rentalEndDate,
      total_price: selectedBike.price,
      status: "scheduled",
      rentalDays: parseInt(rentalDays),
      name,
      bike,
      createdAt: rentalStartDate,
      updatedAt: rentalStartDate,
    });

    const delivery = await Delivery.create({
      name,
      address,
      deliveryDate: deliveryDate,
      deliveryTime: deliveryTime,
      rentalId: rental.id,
      createdAt: rentalStartDate,
      updatedAt: rentalStartDate,
    });

    res.status(201).json({
      message: "Rental and delivery scheduled successfully",
      rental,
      delivery,
    });
  } catch (error) {
    console.error("Error scheduling rental and delivery:", error);
    res.status(500).json({
      error: "An error occurred while scheduling rental and delivery",
    });
  }
});

module.exports = router;
