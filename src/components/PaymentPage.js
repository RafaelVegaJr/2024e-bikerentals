import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PpcpTI24ZLxTROyx5lutFdXOGte2ltdgSDTyuu3mC85yM66ssnMSBdlTIAEwJTU21fyt0BTD3hQnGeBgUZGghoB00VPt9ZatB"
);

const PaymentPage = () => {
  const { state } = useLocation();
  console.log("Payment Page State: ", state);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  if (!state || !state.data) {
    navigate("/home");
    return null;
  }

  const { clientSecret, rental, delivery, totalPrice } = state.data;
  console.log("Client Secret: ", clientSecret);
  console.log("Total Price: ", totalPrice);
  const bikePrice = rental.total_price; // The price of the bike rental
  const deliveryFee = totalPrice - bikePrice; // Delivery fee is the total minus

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: rental.name,
          },
        },
      }
    );

    if (error) {
      setErrorMessage(error.message);
    } else if (paymentIntent.status === "succeeded") {
      // Payment successful, navigate to confirmation page
      navigate("/confirmation", { state: { data: { rental, delivery } } });
    }
  };

  return (
    <div>
      <h1>Payment</h1>
      <p>Bike Rental: ${bikePrice}</p> {/* Show bike rental cost */}
      <p>Delivery Fee: ${deliveryFee}</p> {/* Show delivery fee */}
      <p>
        <strong>Total Amount: ${totalPrice}</strong>
      </p>{" "}
      {/* Show total amount */}
      <form onSubmit={handlePaymentSubmit}>
        <CardElement />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    </div>
  );
};

const WrappedPaymentPage = () => (
  <Elements stripe={stripePromise}>
    <PaymentPage />
  </Elements>
);

export default WrappedPaymentPage;
