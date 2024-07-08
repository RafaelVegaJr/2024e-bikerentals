require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    dialectOptions: {
      options: {
        encrypt: true, // Use true if you're on Azure SQL
        trustServerCertificate: true, // Change to false for production environments with a valid SSL certificate
      },
    },
    logging: console.log, // Log SQL queries
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to SQL Server");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
