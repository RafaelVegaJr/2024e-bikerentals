// src/utils/deliveryUtils.js

const deliveryFees = {
  indio: 5,
  coachella: 8,
  palmdesert: 10,
  cathedralcity: 15,
  palmsprings: 20,
};

const getDeliveryFee = (city) => {
  const normalizedCity = city.toLowerCase().replace(/\s+/g, ""); // Normalizing the city
  console.log("Normalized City:", normalizedCity); // Add this log to see the normalized city
  return deliveryFees[normalizedCity] || 0; // Look up the delivery fee or default to 0
};

module.exports = { getDeliveryFee };
