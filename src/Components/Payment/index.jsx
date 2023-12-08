import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState, useEffect, useContext } from 'react';
import { useCart } from "../../Context/cart.context";
import { PaymentElement } from "@stripe/react-stripe-js";

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
    // write State
    const [success, setSuccess] = useState(false);
    const [cart, setCart] = useState(null);
    // Initialize Stripe
    const stripe = useStripe();
    //Initialize Stripe Elements
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsProcessing(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
              // Make sure to change this to your payment completion page
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

/*
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {
            // payment Method Id
            const {id} = paymentMethod
            console.log(cart);
            const response = await axios.post("https://rent-tech-hub.adaptable.app/api/payment", {
                // defines the price in cents (500 = 5EUR)
                amount: 500,
                id,
                cart
            })

            if(response.data.success) {
                setSuccess(true)
            }

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}

useEffect(()=> {             
    setCart(props.prize);
  }, [props] );
 
*/
    return (
        /*
        <div>
            <h1>Success</h1>
        {!success ? 
        <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button>Pay</button>
        </form>
        :
       <div>
           <h2>Your Payment worked. Congrats!</h2>
       </div> 
        }
            
        </div>
        */

        
        <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />
        <button disabled={isProcessing || !stripe || !elements} id="submit">
          <span id="button-text">
            {isProcessing ? "Processing ... " : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
      
    );
}

export default PaymentForm;