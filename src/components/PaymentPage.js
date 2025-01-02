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
  const [isProcessing, setIsProcessing] = useState(false);

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

    if (!stripe || !elements || !clientSecret) {
      setErrorMessage("Stripe has not loaded properly. Please try again.");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      setIsProcessing(true);
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
        navigate("/confirmation", {
          state: { data: { rental, delivery, totalPrice } },
        });
      }
    } catch (error) {
      console.error("Payment failed:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Payment</h1>
      <p>
        Bike Rental: ${rentalCost} for {rentalDuration} hours
      </p>
      <p>Delivery Fee: ${deliveryFee}</p>
      <p>
        <strong>Total Amount: ${totalPrice}</strong>
      </p>
      <form onSubmit={handlePaymentSubmit} style={{ marginTop: "20px" }}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: isProcessing ? "not-allowed" : "pointer",
          }}
        >
          {isProcessing ? "Processing..." : "Pay"}
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
