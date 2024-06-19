const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const sequelize = require("./database");
const Delivery = require("./models/Delivery");
const User = require("./models/User"); // Ensure you have this line to import the User model
const usersRouter = require("./routes/users");
const bikesRouter = require("./routes/bikes");
const deliveriesRouter = require("./routes/deliveries");

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/users", usersRouter);
app.use("/api/bikes", bikesRouter);
app.use("/api/deliveries", deliveriesRouter);

// Sync the database
sequelize.sync({ alter: false }).then(() => {
  console.log("Database synced");
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
