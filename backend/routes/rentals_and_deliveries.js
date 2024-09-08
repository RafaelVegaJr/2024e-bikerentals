const express = require("express");
const router = express.Router();
const { Sequelize } = require("sequelize");
const Rental = require("../models/Rental");
const Delivery = require("../models/Delivery");
const User = require("../models/User");
const Bike = require("../models/Bike");
const moment = require("moment");

console.log("Rentals and Deliveries Router Loaded");

router.post("/", async (req, res) => {
  // Destructure dropOffAddress and dropOffCity along with other fields
  const {
    name,
    bike,
    rentalDays,
    address,
    deliveryDate,
    deliveryTime,
    dropOffAddress,
    dropOffCity,
  } = req.body;

  console.log("Drop-off Address:", dropOffAddress);
  console.log("Drop-off City:", dropOffCity);

  console.log("Received data:", req.body);

  try {
    // Replace "newuser" with the actual username you're using or pass it from the frontend
    const user = await User.findOne({ where: { username: "newuser" } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the bike by ID instead of name
    const selectedBike = await Bike.findOne({ where: { id: bike } });
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

    const combinedDeliveryDateTime = moment(
      `${deliveryDate} ${deliveryTime}`,
      "YYYY-MM-DD HH:mm:ss"
    ).toDate();
    if (!moment(combinedDeliveryDateTime).isValid()) {
      throw new Error("Invalid date or time format");
    }

    console.log("Rental Start Date:", rentalStartDate);
    console.log("Rental End Date:", rentalEndDate);
    console.log("Combined Delivery DateTime:", combinedDeliveryDateTime);

    const rental = await Rental.create({
      user_id: userId,
      bike_id: bikeId,
      rental_start_date: rentalStartDate,
      rental_end_date: rentalEndDate,
      total_price: selectedBike.price * parseInt(rentalDays), // Assuming price is per day
      status: "scheduled",
      rentalDays: parseInt(rentalDays),
      name,
      bike: selectedBike.name, // Save the name of the bike for easier reference
      createdAt: rentalStartDate,
      updatedAt: rentalStartDate,
    });

    console.log("Rental Created: ", rental);

    const delivery = await Delivery.create({
      name,
      address, // Assuming this is the user's address
      dropOffAddress, // Now this is defined and passed correctly
      dropOffCity, // Now this is defined and passed correctly
      deliveryDate,
      deliveryTime,
      rentalId: rental.id,
      createdAt: rentalStartDate,
      updatedAt: rentalStartDate,
    });

    console.log("Delivery Created: ", delivery);

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
