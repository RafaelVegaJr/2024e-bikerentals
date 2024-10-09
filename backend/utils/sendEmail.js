const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables from .env

// Function to send an email notification
const sendEmailNotification = (rentalDetails) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // Access Gmail email from environment variables
      pass: process.env.GMAIL_PASS, // Access Gmail password from environment variables
    },
  });

  let mailOptions = {
    from: process.env.GMAIL_USER, // Your Gmail address
    to: process.env.GMAIL_USER, // Email to yourself to get notifications
    subject: "New E-Bike Rental",
    text: `A new e-bike rental has been made! Details: \n${JSON.stringify(
      rentalDetails,
      null,
      2
    )}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = sendEmailNotification;
