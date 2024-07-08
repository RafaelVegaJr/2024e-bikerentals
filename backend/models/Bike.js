const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Bike = sequelize.define(
  "Bike",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    availability_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "Bikes",
    timestamps: false,
  }
);

module.exports = Bike;
