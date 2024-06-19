const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Delivery = sequelize.define("Delivery", {
  name: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  deliveryDate: { type: DataTypes.DATEONLY, allowNull: false },
  deliveryTime: { type: DataTypes.TIME, allowNull: false },
  rentalDuration: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Delivery;
