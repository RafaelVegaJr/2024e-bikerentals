const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Rental = require("./Rental");

const Delivery = sequelize.define("Delivery", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deliveryDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  deliveryTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  rentalId: {
    type: DataTypes.INTEGER,
    references: {
      model: Rental,
      key: "id",
    },
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

Rental.hasOne(Delivery, { foreignKey: "rentalId" });
Delivery.belongsTo(Rental, { foreignKey: "rentalId" });

module.exports = Delivery;
