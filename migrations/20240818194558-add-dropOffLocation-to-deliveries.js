"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add dropOffCity column
    await queryInterface.addColumn("Deliveries", "dropOffCity", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    // Add dropOffAddress column
    await queryInterface.addColumn("Deliveries", "dropOffAddress", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    // Remove dropOffLocation column
    await queryInterface.removeColumn("Deliveries", "dropOffLocation");
  },

  down: async (queryInterface, Sequelize) => {
    // Reverse the operations in the up method
    await queryInterface.removeColumn("Deliveries", "dropOffCity");
    await queryInterface.removeColumn("Deliveries", "dropOffAddress");
    await queryInterface.addColumn("Deliveries", "dropOffLocation", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
