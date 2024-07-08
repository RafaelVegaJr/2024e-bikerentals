const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database");

const Rental = sequelize.define("Rental", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bike_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rental_start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  rental_end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  rentalDays: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bike: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});

module.exports = Rental;
