require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true, // Required for Railway MySQL SSL
    },
  },
  logging: console.log,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to MySQL database via DATABASE_URL");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
