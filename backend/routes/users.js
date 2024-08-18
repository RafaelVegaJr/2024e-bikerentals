const express = require("express");
const router = express.Router();
const sequelize = require("../database");
const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

// Define User model
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    tableName: "Users",
    timestamps: false,
  }
);

const secretKey = process.env.JWT_SECRET;

// Register new user with validation
router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("phone")
      .optional()
      .notEmpty()
      .withMessage("Phone number is required if provided"),

    body("role").optional().isIn(["user", "admin"]).withMessage("Invalid role"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, password, email, phone, address, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        username,
        password: hashedPassword,
        email,
        phone,
        address,
        role,
      });

      res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
      console.error("Error during registration:", error);
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
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, password } = req.body;

      const user = await User.findOne({ where: { username } });
      if (!user) return res.status(400).json({ message: "User not found" });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: user.id, role: user.role }, secretKey, {
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
