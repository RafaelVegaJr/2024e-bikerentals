const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const usersRouter = require("./routes/users");
const bikesRouter = require("./routes/bikes");

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Adjust this if your frontend runs on a different origin
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/users", usersRouter); // Ensure this is correct
app.use("/api/bikes", bikesRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
