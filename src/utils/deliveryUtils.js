// src/utils/deliveryUtils.js

const deliveryFees = {
  indio: 5,
  coachella: 8,
  palmdesert: 10,
  cathedralcity: 15,
  palmsprings: 20,
};

const getDeliveryFee = (city) => {
  const normalizedCity = city.toLowerCase().replace(/\s+/g, "");
  return deliveryFees[normalizedCity] || 0;
};

module.exports = { getDeliveryFee };
