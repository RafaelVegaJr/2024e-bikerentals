const express = require("express");
const router = express.Router();
const { Sequelize } = require("sequelize");
const Rental = require("../models/Rental");
const Delivery = require("../models/Delivery");
const User = require("../models/User");
const Bike = require("../models/Bike");
const moment = require("moment");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Add Stripe

console.log("Rentals and Deliveries Router Loaded");

// Route for scheduling rentals and deliveries
router.post("/", async (req, res) => {
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

  try {
    const user = await User.findOne({ where: { username: "newuser" } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const selectedBike = await Bike.findOne({ where: { id: bike } });
    if (!selectedBike) {
      return res.status(404).json({ error: "Bike not found" });
    }

    const userId = user.id;
    const bikeId = selectedBike.id;

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

    const rental = await Rental.create({
      user_id: userId,
      bike_id: bikeId,
      rental_start_date: rentalStartDate,
      rental_end_date: rentalEndDate,
      total_price: selectedBike.price * parseInt(rentalDays),
      status: "scheduled",
      rentalDays: parseInt(rentalDays),
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
      currency: "usd", // Specify your currency
      payment_method_types: ["card"],
    });

    // Return the client secret that the frontend will use to confirm the payment
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
