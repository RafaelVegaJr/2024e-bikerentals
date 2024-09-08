const moment = require("moment");

const combineAndValidateDateTime = (date, time) => {
  const combinedDateTime = moment(
    `${date} ${time}`,
    "YYYY-MM-DD HH:mm:ss"
  ).toDate();
  if (!moment(combinedDateTime).isValid()) {
    throw new Error("Invalid date or time format");
  }
  return combinedDateTime;
};

module.exports = { combineAndValidateDateTime };
