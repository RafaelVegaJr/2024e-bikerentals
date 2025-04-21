// src/utils/deliveryUtils.js

const deliveryFees = {
  indio: 5,
  coachella: 8,
  palmdesert: 10,
  cathedralcity: 15,
  palmsprings: 20,
};

export const getDeliveryFee = (city) => {
  const normalizedCity = city.toLowerCase().replace(/\s+/g, "");
  console.log("Normalized City:", normalizedCity);
  return deliveryFees[normalizedCity] || 0;
};
