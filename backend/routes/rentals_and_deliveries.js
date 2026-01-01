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

console.log("🔍 Rental endpoint hit — running DB:", process.env.DB_NAME);
console.log("Rentals and Deliveries Router Loaded");
console.log("🔍 Using DB:", process.env.DB_NAME);
console.log("Host:", process.env.DB_HOST);
console.log("User:", process.env.DB_USER);

// Route for scheduling rentals and deliveries

router.post("/", async (req, res) => {
  const {
    username,
    bike,
    rentalHours,
    deliveryDate,
    deliveryTime,
    name,
    address,
    phone,
    dropOffAddress,
    dropOffCity,
    deliveryFee,
  } = req.body;

  try {
    // ✅ Check if user exists
    // ✅ Check if user exists or create if not
    console.log("Looking for user:", username);
    let user = await User.findOne({ where: { username } });

    if (!user) {
      console.log("User not found, creating new user...");

      user = await User.create({
        username,
        full_name: name,
        email: `${username}@example.com`, // <-- make sure this is unique or update as needed
        password: "defaultpassword123", // <-- placeholder; you can improve this
        role: "user",
      });

      console.log("New user created:", user.username);
    }

    // ✅ Check if selected bike exists
    const selectedBike = await Bike.findOne({ where: { id: bike } });
    if (!selectedBike) {
      return res.status(404).json({ error: "Bike not found" });
    }

    // ✅ Setup rental period and cost
    const rentalStartDate = new Date();
    const rentalEndDate = new Date(rentalStartDate);
    rentalEndDate.setHours(rentalEndDate.getHours() + parseInt(rentalHours));
    const rentalCostPerHour = 10;
    const rentalCost = rentalCostPerHour * rentalHours;
    const fullTotalPrice = rentalCost + Number(deliveryFee || 0);

    // ✅ Combine date + time for validation
    const combinedDeliveryDateTime = moment(
      `${deliveryDate} ${deliveryTime}`,
      "YYYY-MM-DD HH:mm:ss"
    ).toDate();

    if (!moment(combinedDeliveryDateTime).isValid()) {
      throw new Error("Invalid date or time format");
    }

    // ✅ Create rental
    const rental = await Rental.create({
      user_id: user.id,
      bike_id: selectedBike.id,
      rental_start_date: rentalStartDate,
      rental_end_date: rentalEndDate,
      rental_price: rentalCost, // Only the bike rental portion (e.g., $10)
      total_price: fullTotalPrice, // Total including delivery fee (e.g., $18)
      status: "scheduled",
      rentalDays: parseInt(rentalHours),
      name,
      bike: selectedBike.name,
      createdAt: rentalStartDate,
      updatedAt: rentalStartDate,
    });

    // ✅ Create delivery
    const delivery = await Delivery.create({
      name,
      address,
      dropOffAddress,
      dropOffCity,
      deliveryDate,
      deliveryTime,
      phone,
      rentalId: rental.id,
      createdAt: rentalStartDate,
      updatedAt: rentalStartDate,
    });

    // ✅ Send email with details
    const rentalDetails = {
      name,
      username,
      bike: selectedBike.name,
      rentalDuration: rentalHours,
      deliveryDate,
      deliveryTime,
      rentalStartDate,
      rentalEndDate,
      dropOffAddress,
      dropOffCity,
      fullTotalPrice,
      deliveryFee,
      rentalId: rental.id,
    };

    console.log("Sending email with details:", rentalDetails);
    sendEmailNotification(rentalDetails);

    res.status(201).json({
      message: "Rental and delivery scheduled successfully",
      rental,
      delivery,
    });
  } catch (error) {
    console.error(
      "Error scheduling rental and delivery:",
      error.message,
      error.stack
    );

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
