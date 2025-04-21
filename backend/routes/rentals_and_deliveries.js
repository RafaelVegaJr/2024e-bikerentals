const express = require("express");
const router = express.Router();
const { Sequelize } = require("sequelize");
const Rental = require("../models/Rental");
const Delivery = require("../models/Delivery");
const User = require("../models/User");
const Bike = require("../models/Bike");
const moment = require("moment");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const sendEmailNotification = require("../utils/sendEmail");

console.log("Rentals and Deliveries Router Loaded");

// Route for scheduling rentals and deliveries
router.post("/", async (req, res) => {
  const {
    name,
    bike,
    rentalHours,
    address,
    deliveryDate,
    deliveryTime,
    dropOffAddress,
    dropOffCity,
    deliveryFee,
  } = req.body;

  try {
    const { username } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const selectedBike = await Bike.findOne({ where: { id: bike } });
    if (!selectedBike) {
      return res.status(404).json({ error: "Bike not found" });
    }

    const rentalStartDate = new Date();
    const rentalEndDate = new Date(rentalStartDate);
    rentalEndDate.setHours(rentalStartDate.getHours() + parseInt(rentalHours));

    // Calculate the rental cost at $10 per hour
    const rentalCostPerHour = 10;
    const totalRentalCost = rentalCostPerHour * rentalHours;

    const combinedDeliveryDateTime = moment(
      `${deliveryDate} ${deliveryTime}`,
      "YYYY-MM-DD HH:mm:ss"
    ).toDate();

    if (!moment(combinedDeliveryDateTime).isValid()) {
      throw new Error("Invalid date or time format");
    }

    const rental = await Rental.create({
      user_id: user.id,
      bike_id: selectedBike.id,
      rental_start_date: rentalStartDate,
      rental_end_date: rentalEndDate,
      total_price: totalRentalCost,
      status: "scheduled",
      rentalDays: parseInt(rentalHours),
      name,
      bike: selectedBike.name,
      createdAt: rentalStartDate,
      updatedAt: rentalStartDate,
    });

    const delivery = await Delivery.create({
      name,
      address,
      dropOffAddress,
      dropOffCity,
      deliveryDate,
      deliveryTime,
      rentalId: rental.id,
      createdAt: rentalStartDate,
      updatedAt: rentalStartDate,
    });
    // Send email notification after successfully scheduling the rental and delivery
    const rentalDetails = {
      name,
      bike: selectedBike.name,
      rentalDuration: rentalHours,
      deliveryDate,
      deliveryTime,
      rentalStartDate, // <-- Make sure you pass this
      rentalEndDate,
      dropOffAddress,
      dropOffCity,
      totalRentalCost,
      deliveryFee,
      rentalId: rental.id,
    };
    console.log(rentalDetails); // Verify contents

    sendEmailNotification(rentalDetails); // Call the email function

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

// New route for creating payment intent
router.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in smallest unit (e.g., cents for USD)
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({
      error: "An error occurred while creating payment intent",
    });
  }
});

module.exports = router;
