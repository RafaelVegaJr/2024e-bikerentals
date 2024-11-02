const express = require("express");
const router = express.Router();
const sequelize = require("../database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

// Import the User model
const User = require("../models/User");

const secretKey = process.env.JWT_SECRET;

// Signup new user with validation
router.post(
  "/signup", // Updated route from /register to /signup
  [
    body("full_name").notEmpty().withMessage("Full name is required"), // Validating full name
    body("email").isEmail().withMessage("Valid email is required"), // Validating email
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"), // Validating password length
  ],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { full_name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        full_name,
        email,
        password: hashedPassword,
      });

      res.status(201).json({ message: "User signed up successfully", user });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({
        error: "An error occurred while creating user",
        details: error.message,
      });
    }
  }
);

// Login user with validation
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"), // Use email for login instead of username
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } }); // Find by email
      if (!user) return res.status(400).json({ message: "User not found" });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: user.id }, secretKey, {
        expiresIn: "1h",
      });
      res.json({ token });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "An error occurred during login" });
    }
  }
);

// Get user profile with token validation
router.get("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, secretKey);
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "An error occurred while fetching profile" });
  }
});

module.exports = router;
