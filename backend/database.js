require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "mysql", // Default to 'mysql' if not set
    port: process.env.DB_PORT || 3306, // Default MySQL port is 3306
    logging: console.log, // Log SQL queries
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to MySQL/MariaDB database");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
