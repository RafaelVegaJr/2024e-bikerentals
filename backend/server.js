const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

const sequelize = require("./database");
const paymentsRouter = require("./routes/payments"); // ⬅️ add this

console.log("Loading routes...");

const rentalsAndDeliveriesRouter = require("./routes/rentals_and_deliveries");
const usersRouter = require("./routes/users");
const bikesRouter = require("./routes/bikes");

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://electrikcruise.netlify.app",
      "https://electrikcruise.com",
    ],
    credentials: true,
  })
);

app.use("/api/payments/webhook", express.raw({ type: "application/json" }));

app.use(express.json());

// Routes
app.use("/api/rentals_and_deliveries", rentalsAndDeliveriesRouter);
app.use("/api/users", usersRouter);
app.use("/api/payments", paymentsRouter); // ⬅️ register the route

console.log("Users route loaded: /api/users");

app.use("/api/bikes", bikesRouter);

console.log("Routes loaded successfully");

// Sync the database
sequelize.sync({ alter: false }).then(() => {
  console.log("Database synced");
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
