const nodemailer = require("nodemailer");
require("dotenv").config(); // Make sure to load the environment variables

const sendTestEmail = () => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail user from .env
      pass: process.env.GMAIL_PASS, // Your Gmail password from .env
    },
  });

  let mailOptions = {
    from: process.env.GMAIL_USER, // Your email
    to: process.env.GMAIL_USER, // Sending to yourself
    subject: "Test Email",
    text: "This is a test email to check if Nodemailer is working properly.",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error sending email:", error);
    }
    console.log("Email sent successfully:", info.response);
  });
};

// Call the test function
sendTestEmail();
