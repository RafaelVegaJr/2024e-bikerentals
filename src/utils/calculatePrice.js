// src/utils/calculatePrice.js

const deliveryFees = {
  Indio: 5,
  Coachella: 8,
  Palmdesert: 10,
  Cathedralcity: 15,
  Palmsprings: 20,
};

const calculateTotalPrice = (
  bikePrice,
  rentalDays,
  dropOffCity,
  deliveryFee
) => {
  const normalizedCity = dropOffCity.toLowerCase().replace(/\s+/g, "");
  // If deliveryFee is passed, use it; otherwise, fall back to calculated fee based on the city
  const finalDeliveryFee =
    deliveryFee !== undefined ? deliveryFee : deliveryFees[normalizedCity] || 0;
  return bikePrice * parseInt(rentalDays) + finalDeliveryFee;
};

module.exports = { calculateTotalPrice };
