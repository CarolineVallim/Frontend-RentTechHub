import "./index.css";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../../Components/Payment/index";
import axios from 'axios';
import { useCart } from "../../Context/cart.context";
import {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
import { AuthContext } from "../../Context/auth.context";


// Public Key to be published 
/*const PUBLIC_KEY = "pk_test_51OKeyBHdzgONTQTNBWvInVyaP3NwYYepMwoHImyMu8qxCOwXWyixbETACyH6nsWIrlpvE1w7sUHOaVdqIKvgQD6u00jocdeMKX"

const stripeTestPromise = loadStripe(PUBLIC_KEY);*/

const API_URL = "http://localhost:5005/api";

function Payment() {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
	const { cart, dispatch } = useCart() || {};;
	const [loading, setLoading] = useState(true);
	const { cartId } = useParams();
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);


    
    useEffect(() => {
        axios.get(`${API_URL}/config`)
          .then(async (response) => {
            const { publishableKey } = response.data;
            setStripePromise(loadStripe(publishableKey));
            })
          .catch(error => {
            console.error("Error fetching config:", error);
            // Handle error as needed
          });
      }, []);
/*
    useEffect(() => {
        fetch("/config").then(async (r) => {
          const { publishableKey } = await r.json();
          setStripePromise(loadStripe(publishableKey));
        });
      }, []);
*/
	useEffect(() => {
        if (user && user._id) {
          const fetchData = async () => {
            try {
              const response = await axios.get(`${API_URL}/cart/user/${user._id}`);
              dispatch({ type: "SET_CART", payload: response.data });
              setLoading(false);
            } catch (error) {
              setError(error.response?.data?.message || error.message);
              setLoading(false);
            } 
          };
      
          fetchData();
        }
      }, [dispatch, user]);
        
    
    useEffect(() => {
        if (loading === false && clientSecret === "") {
            const totalPrice = cart[0].total + cart[0].shipping;
            const amount = totalPrice * 100;
        
            axios.post(`${API_URL}/payment`, {
                amount,
                cart,
            })
            .then(async (response) => {
                console.log("Payment request successful. Response:", response.data);

                const { clientSecret } = response.data;
                setClientSecret(clientSecret);
                console.log(clientSecret);
            })
            .catch((error) => {
                console.error("Error making payment request:", error);
                // Handle error as needed
            });
        }
    }, [loading, clientSecret, dispatch, cart]);
/*
    useEffect(() => {
        if (loading === false && clientSecret === null){
            const totalPrice = calculateTotalPrice();
            const amount = totalPrice * 100;
            console.log("test");
            
            fetch("/payment", {
                method: "POST",
                body: JSON.stringify({amount, cart}),
            }).then(async (result) => {
                let { clientSecret } = await result.json();
                setClientSecret(clientSecret);
            });
        }
    }, [loading, clientSecret, dispatch, calculateTotalPrice, cart]);  
 */


	return (
    // Elements Stripe loaded with Test Mode
    <div className="payment-page">
      {/* Render other elements as needed for the payment page */}
      <h1>Payment Page</h1>

      {/* Conditionally render the form */}
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm prize={cart} />
        </Elements>
      )}
    </div>
    );
}

export default Payment