const nodemailer = require("nodemailer");
require("dotenv").config(); // Ensure environment variables are loaded

const sendEmailNotification = (rentalDetails) => {
  let transporter = nodemailer.createTransport({
    service: "yahoo",
    auth: {
      user: process.env.YAHOO_USER, // Your Yahoo email from .env
      pass: process.env.YAHOO_PASS, // Your Yahoo app password from .env
    },
    secure: false, // Set to true if you want to use TLS
    tls: {
      rejectUnauthorized: false,
    },
  });

  const {
    name,
    bike,
    rentalDuration,
    deliveryDate,
    deliveryTime,
    dropOffAddress,
    totalRentalCost,
    deliveryFee,
    rentalId,
    rentalStartDate,
    rentalEndDate,
  } = rentalDetails;

  // Create the email body content
  let emailBody = `
    Rental confirmed for ${name}.
  
    Rental ID: ${rentalId}
    Bike: ${bike}
    Start Date: ${new Date(rentalStartDate).toLocaleString()}
    End Date: ${new Date(rentalEndDate).toLocaleString()}
    Delivery Date: ${deliveryDate}
    Delivery Time: ${deliveryTime}
    Drop-off Address: ${dropOffAddress}
    
    Bike Rental: $${totalRentalCost}
    Delivery Fee: $${deliveryFee}
    Total Price: $${totalRentalCost + deliveryFee}
  `;

  // Log the email body content to verify it's correct
  console.log("Email body:", emailBody);

  let mailOptions = {
    from: process.env.YAHOO_USER,
    to: `${process.env.YAHOO_USER}, titovega12@gmail.com`, // Send to both Yahoo and Gmail
    subject: `Rental and Delivery Confirmation - Rental ID: ${rentalId}`,
    text: emailBody, // Assign the email body to the text of the email
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error sending email:", error);
    }
    console.log("Email sent successfully:", info.response);
  });
};

module.exports = sendEmailNotification;
