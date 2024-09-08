"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add the deliveryDateTime column to the Deliveries table
    await queryInterface.addColumn("Deliveries", "deliveryDateTime", {
      type: Sequelize.DATE,
      allowNull: true, // Set this to false if the field should be mandatory
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the deliveryDateTime column from the Deliveries table
    await queryInterface.removeColumn("Deliveries", "deliveryDateTime");
  },
};
