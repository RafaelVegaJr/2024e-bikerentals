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
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  if (!state || !state.data) {
    navigate("/home");
    return null;
  }

  const {
    clientSecret,
    rental,
    delivery,
    rentalCost,
    rentalDuration,
    totalPrice,
  } = state.data;

  const deliveryFee = delivery.deliveryFee || 0;

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
      navigate("/confirmation", {
        state: { data: { rental, delivery, totalPrice } },
      });
    }
  };

  return (
    <div>
      <h1>Payment</h1>
      <p>
        Bike Rental: ${rentalCost} for {rentalDuration} hours
      </p>
      <p>Delivery Fee: ${deliveryFee}</p>
      <p>
        <strong>Total Amount: ${totalPrice}</strong>
      </p>
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
