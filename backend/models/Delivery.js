const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Rental = require("./Rental");

const Delivery = sequelize.define("Delivery", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false, // Ensure that a phone number is required
    },
  },
  deliveryDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true,
      notEmpty: true,
    },
  },
  deliveryTime: {
    type: DataTypes.TIME,
    allowNull: false,
    validate: {
      isTime(value) {
        if (!/^\d{2}:\d{2}(:\d{2})?$/.test(value)) {
          throw new Error("Time must be in the format HH:mm:ss");
        }
      },
    },
  },
  // New combined delivery datetime field
  deliveryDateTime: {
    type: DataTypes.DATE,
    allowNull: true, // This can be true if you still want to keep deliveryDate and deliveryTime
    validate: {
      isDate: true,
    },
  },
  dropOffCity: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  dropOffAddress: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
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
