const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensuring unique emails
      validate: {
        isEmail: true, // Validating email format
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user", // Default role
    },
  },
  {
    timestamps: false, // Optional if you do not want created_at/updated_at columns
  }
);

module.exports = User;
