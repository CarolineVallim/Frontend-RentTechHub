import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState, useEffect, useContext } from 'react';
import { useCart } from "../../Context/cart.context";
import { PaymentElement } from "@stripe/react-stripe-js";
import { Button } from "@nextui-org/react";
import { useAsyncError } from "react-router-dom";

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}


function PaymentForm(props) {
    const [success, setSuccess] = useState(false);
    const [cart, setCart] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false)

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
              return_url: `${window.location.origin}/completion`,
            },
          });

          setSuccess(true);
      
          if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
          } else {
            setMessage("An unexpected error occured.");
          }
      
          setIsProcessing(false);
        };

    return (
        <form id="payment-form" onSubmit={handleSubmit} style={{width:"150vh", height:"auto", placeSelf:"center"}}>
        <PaymentElement id="payment-element" />
        <Button isLoading={isLoading} style={{ backgroundColor: '#4CAF4F', color: 'white',}} disabled={isProcessing || !stripe || !elements} id="submit">
          <span id="button-text">
            {isProcessing ? "Processing ... " : "Pay now"}
          </span>
        </Button>
        {message && <div id="payment-message">{message}</div>}
      </form>
      
    );
}

export default PaymentForm;